// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10 <0.9.0;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import {TablelandDeployments} from "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import {SQLHelpers} from "@tableland/evm/contracts/utils/SQLHelpers.sol";

contract SusuContributionStorage is ERC721Holder {
    // Store relevant table info
    uint256 private _tableId; // Unique table ID
    uint256 private primaryKey = 0;
    string private constant _TABLE_PREFIX = "susu_contribution_table"; // Custom table prefix


    // Creates a simple table with an `id` and `val` column
    function createTable() public payable {
      _tableId = TablelandDeployments.get().create(
            address(this),
            SQLHelpers.toCreateFromSchema(
              "id integer primary key," // Notice the trailing comma
              "address text,"
              "groupId text,"
              "amount integer,"
              "roundId integer",
              _TABLE_PREFIX
            )
        );
    }

    function getAddressString(address m) external pure returns (string memory){
        return Strings.toHexString(uint160(m),20);
    }

    // Let anyone insert into the table
    function insertIntoTable( address groupId, address memberAddress, uint256 amount, uint256 roundId) external {
        string memory adr = Strings.toHexString(memberAddress);
        string memory groupid = Strings.toHexString(groupId);
        TablelandDeployments.get().mutate(
            address(this), // Table owner, i.e., this contract
            _tableId,
            SQLHelpers.toInsert(
                _TABLE_PREFIX,
                _tableId,
                "id, groupId, address, amount, roundId",
                string.concat(
                    Strings.toString(primaryKey++), // Convert to a string
                    ",",
                    SQLHelpers.quote(groupid),
                    "," ,
                    SQLHelpers.quote(adr),
                    ",",
                    Strings.toString(amount),
                    ",",
                    Strings.toString(roundId)
                )
            )
        );
    }

    // Update only the row that the caller inserted
    function updateTable(uint256 id, address groupId) external {
        // Set the values to update
        string memory setters = string.concat("groupId=", SQLHelpers.quote(Strings.toHexString(groupId)));
        // Specify filters for which row to update
        string memory filters = string.concat(
            "id=",
            Strings.toString(id)
        );
        // Mutate a row at `id` with a new `val`
        TablelandDeployments.get().mutate(
            address(this),
            _tableId,
            SQLHelpers.toUpdate(_TABLE_PREFIX, _tableId, setters, filters)
        );
    }

    // Delete a row from the table by ID
    function deleteFromTable(uint256 id) external {
        // Specify filters for which row to delete
        string memory filters = string.concat(
            "id=",
            Strings.toString(id)
        );
        // Mutate a row at `id`
        TablelandDeployments.get().mutate(
            address(this),
            _tableId,
            SQLHelpers.toDelete(_TABLE_PREFIX, _tableId, filters)
        );
    }

    // Set the ACL controller to enable row-level writes with dynamic policies
    function setAccessControl(address controller) external {
        TablelandDeployments.get().setController(
            address(this), // Table owner, i.e., this contract
            _tableId,
            controller // Set the controller address— a separate controller contract
        );
    }

    // Return the table ID
    function getTableId() external view returns (uint256) {
        return _tableId;
    }

    // Return the table name
    function getTableName() external view returns (string memory) {
        return SQLHelpers.toNameFromId(_TABLE_PREFIX, _tableId);
    }
}
