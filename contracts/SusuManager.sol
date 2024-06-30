//SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import {SusuWallet} from "./SusuWallet.sol";

contract SusuManager is Initializable, OwnableUpgradeable {
    
    event ContributionMade(
        address indexed contributor,
        uint256 indexed roundId,
        uint256 amount
    );

    event AddedContributor(address indexed contributor);

    address internal constant SENTINEL_CONTRIBUTORS = address(0x1);
    address _contributionToken;
    address private _currentBeneficiary;
    address public groupTableAddress;
    address public susuWalletTableAddress;
    address public susuContributionsTableAddress;

    uint256 private _roundId;
    uint256 private contributorCount;
    uint256 private _amountPerHead;
    uint64 private _roundLength = 5 days;
    bool isInistialized = false;

    mapping(uint256 => address) susuWallets;
    mapping(address => mapping(uint256 => uint256)) private contributions; // mapping of contributors and thier contributions
    mapping(address => address) private contributors;

    modifier canContribute(
        address contributor,
        uint256 amount,
        uint256 roundId_
    ) {
        require(amount > 0, "Insufficient amount");
        require(
            contributions[contributor][roundId_] < _amountPerHead,
            "Round contribution per head reached"
        );
        _;
    }

    modifier onlyContributor(address contributor) {
        require(isContributor(contributor));
        _;
    }

    modifier isValidRound(uint256 roundId_) {
        require(susuWallets[roundId_] != address(0));
        _;
    }

    function initialize(
        address _susuGroupTableAddress,
        address _susuWalletTableAddress,
        address _susuContributionTableAddress,
        address initialOwner,
        address token,
        uint256 amountPerHead_,
        address[] memory _contributors
    ) public initializer {
        require(!isInistialized);
        __Ownable_init(initialOwner);

        _amountPerHead = amountPerHead_;

        _contributionToken = token;

        groupTableAddress = _susuGroupTableAddress;

        susuWalletTableAddress = _susuWalletTableAddress;

        susuContributionsTableAddress = _susuContributionTableAddress;

        setupContributors(_contributors);

        _currentBeneficiary = SENTINEL_CONTRIBUTORS;

        isInistialized = true;
    }

    /**
     * @notice This is fashioned after safe `setupOwners` function
     * @dev adds contriubtors
     */
    function setupContributors(address[] memory _contributors) internal {
        // address currentContributor = SENTINEL_CONTRIBUTORS;
        for (uint256 i = 0; i < _contributors.length; i++) {
            // currentContributor = _contributors[i];
            _addContributor(_contributors[i]);
        }

        // contributors[currentContributor] = SENTINEL_CONTRIBUTORS;
        // contributorCount = _contributors.length;
    }

    /**
     * @dev Make native currency contribution
     */
    function makeContribution(uint256 roundId_, address from)
        external
        payable
        virtual
        onlyContributor(from)
        canContribute(from, msg.value, roundId_)
        isValidRound(roundId_)
    {
        address walletAddress = susuWallets[roundId_];
        Address.sendValue(payable(walletAddress), msg.value);
        contributions[from][roundId_] += msg.value;
        emit ContributionMade(from, roundId_, msg.value);
    }

    /**
     * @dev Make erc20 contribution
     */
    function makeContribution(
        uint256 roundId_,
        address from,
        uint256 amount
    )
        external
        virtual
        onlyContributor(from)
        canContribute(from, amount, roundId_)
        isValidRound(roundId_)
    {
        address walletAddress = susuWallets[roundId_];
        SafeERC20.safeTransferFrom(
            IERC20(_contributionToken),
            from,
            address(walletAddress),
            amount
        );

         // Mint contributor nft
        (bool success,) = susuContributionsTableAddress.call(abi.encodeWithSignature("insertIntoTable(address,address,uint256,uint256)", address(this), from, amount, roundId_));

        require(success, "Failed to generate NFT");

        contributions[from][roundId_] += amount;
        emit ContributionMade(from, roundId_, amount);
    }

    function withdrawalBenefit(uint256 roundId) external {}

    function _addContributor(address contributor) internal virtual {
        // Owner address cannot be null, the sentinel or the `SusuManager` itself.
        if (
            contributor == address(0) ||
            contributor == SENTINEL_CONTRIBUTORS ||
            contributor == address(this)
        ) revert("invalid contributor address");

        // No duplicate contributor allows

        if (contributors[contributor] != address(0))
            revert("Contributor already added");

        
        contributors[SENTINEL_CONTRIBUTORS] = contributor;
        contributors[contributor] = SENTINEL_CONTRIBUTORS ;

        // Mint contributor nft
        (bool success,) = groupTableAddress.call(abi.encodeWithSignature("insertIntoTable(address,address)", address(this), contributor));

        require(success, "Failed to generate NFT");

        contributorCount++;

        emit AddedContributor(contributor);
    }

    /**
     * @dev Add contributor
     */
    function addContributor(address contributor) public virtual onlyOwner {
        _addContributor(contributor);
    }

    /**
     * @dev Getter for `susuWallet` address for a given round
     */
    function getSusuWallet(uint256 roundId_)
        public
        view
        virtual
        returns (address)
    {
        return susuWallets[roundId_];
    }

    /**
     * @dev Getter for current susu roundID
     */
    function roundID() public view virtual returns (uint256) {
        return _roundId;
    }

    function _startRound(address beneficiary, uint256 roundId_)
        internal
        returns (address)
    {
        SusuWallet susu = new SusuWallet(
            beneficiary,
            uint64(block.timestamp),
            _roundLength
        );

        address walletAddress = address(susu);

        susuWallets[roundId_] = walletAddress;

        // Mint contributor nft
        (bool success,) = susuWalletTableAddress.call(abi.encodeWithSignature("insertIntoTable(address,address,uint256)", address(this), beneficiary, roundId_));

        require(success, "Failed to generate NFT");

        return walletAddress;
    }

    /**
     * @dev Start a new susu round
     */
    function startNewRound() public returns (address) {
        //If it is not the first round check if the previous round has ended
        if (_roundId > 0) {
            require(hasRoundEnded(_roundId - 1), "Previous round must end");
        }
        uint256 nextRoundId = _roundId++;
        address beneficiary = nextBeneficiary();
        _startRound(beneficiary, nextRoundId);
        _currentBeneficiary = beneficiary;
        return _currentBeneficiary;
    }

    /**
     * @dev Check if a given address is a contributor
     */
    function isContributor(address _contributor) public view returns (bool) {
        return
            !(_contributor == SENTINEL_CONTRIBUTORS ||
                contributors[_contributor] == address(0));
    }

    /**
     * @dev Getter for _currentBeneficiary
     */
    function currentBeneficiary() public view returns (address) {
        return _currentBeneficiary;
    }

    /**
     * @dev Get for next beneficiary in the queue;
     */
    function nextBeneficiary() public view returns (address) {
        return contributors[currentBeneficiary()];
    }

    /**
     * @dev
     */
    function getRoundLength() public view returns (uint64) {
        return _roundLength;
    }

    /**
     * @dev
     */
    function updateRoundLength(uint64 roundLength) external onlyOwner {
        _roundLength = roundLength;
    }

    /**
     * @dev Getter for `amountPerHead`
     */
    function amountPerHead() external view returns (uint256) {
        return _amountPerHead;
    }

    /**
     * @dev update `amountPerhead`
     */
    function updateAmountPerHead(uint256 amountPerHead_)
        public
        onlyOwner
        returns (uint256)
    {
        require(
            amountPerHead_ > 0,
            "Amount per head should be greater than zero (0)"
        );
        _amountPerHead = amountPerHead_;
        return amountPerHead_;
    }

    /**
     * @dev Get contribution of contributor for a round
     */
    function getRoundContribution(address contributor, uint256 roundId_)
        public
        view
        isValidRound(roundId_)
        returns (uint256)
    {
        require(isContributor(contributor), "Invalid contributor address");
        return contributions[contributor][roundId_];
    }

    /**
     * @dev Checks if a given `roundId` has ended
     */
    function hasRoundEnded(uint256 roundId_) public returns (bool) {
        require(roundId_ < _roundId, "Invalid round Id");
        address roundAddress = susuWallets[roundId_];
        require(roundAddress != address(0), "Round Not found");

        bytes memory response = Address.functionCall(
            roundAddress,
            abi.encodeWithSignature("end()")
        );
        uint256 endDate = abi.decode(response, (uint256));
        return endDate < block.timestamp;
    }
}
