'use client';

import { BigNumberish } from "ethers";
import { getProvider, useSigner } from "../hooks/useSigner";
import { Database } from "@tableland/sdk";

// A component with form inputs to to create a table, write data to it, and read data from it
export function useTableland() {

  // Get the connected signer
  const provider = getProvider();

  // Create a table with hardcoded prefix and schema
  async function readUserGroups(address: `0x${string}`) {
    const network  = (await provider.getNetwork())
    // const endpoint = process.env.NODE_ENV === 'test' ? process.env.TABLELAND_GATEWAY_LOCAL : process.env.NODE_ENV === 'development' ? process.env.TABLELAND_GATEWAY_TESTNET : process.env.TABLELAND_GATEWAY_MAINNET;
  const tableName = `susu_groups_table_${network.chainId}_3`  //|| process.env.NODE_ENV === 'test' ? process.env.TABLELAND_GROUPS_TABLE_LOCAL : process.env.NODE_ENV === 'development' ? process.env.TABLELAND_GROUPS_TABLE_TESTNET : process.env.TABLELAND_GROUPS_TABLE_MAINNET;
    try {
      const db = new Database({ signer: provider });

      const query = `SELECT * FROM ${tableName} WHERE address='${address}';`;
      
      console.log(query, network);

      const { results } = await db.prepare(query).all();

      return results;
    } catch (err) {
      console.log(err.message);
    }
  }
  async function readGroupsMembers(address: `0x${string}`) {
    const network  = (await provider.getNetwork())
    // const endpoint = process.env.NODE_ENV === 'test' ? process.env.TABLELAND_GATEWAY_LOCAL : process.env.NODE_ENV === 'development' ? process.env.TABLELAND_GATEWAY_TESTNET : process.env.TABLELAND_GATEWAY_MAINNET;
  const tableName = `susu_groups_table_${network.chainId}_3`  //|| process.env.NODE_ENV === 'test' ? process.env.TABLELAND_GROUPS_TABLE_LOCAL : process.env.NODE_ENV === 'development' ? process.env.TABLELAND_GROUPS_TABLE_TESTNET : process.env.TABLELAND_GROUPS_TABLE_MAINNET;
    try {
      const db = new Database({ signer: provider });

      const query = `SELECT * FROM ${tableName} WHERE groupId='${address}';`;

      const { results } = await db.prepare(query).all();

      return results;
    } catch (err) {
      console.log(err.message);
    }
  }

  async function readGroupContributions(address: `0x${string}`) {
    const network  = (await provider.getNetwork())
    // const endpoint = process.env.NODE_ENV === 'test' ? process.env.TABLELAND_GATEWAY_LOCAL : process.env.NODE_ENV === 'development' ? process.env.TABLELAND_GATEWAY_TESTNET : process.env.TABLELAND_GATEWAY_MAINNET;
  const tableName = `susu_contribution_table_${network.chainId}_4`  //|| process.env.NODE_ENV === 'test' ? process.env.TABLELAND_GROUPS_TABLE_LOCAL : process.env.NODE_ENV === 'development' ? process.env.TABLELAND_GROUPS_TABLE_TESTNET : process.env.TABLELAND_GROUPS_TABLE_MAINNET;
    try {
      const db = new Database({ signer: provider });

      const query = `SELECT * FROM ${tableName} WHERE groupId='${address}';`;
      
      console.log(query, network);

      const { results } = await db.prepare(query).all();

      return results;
    } catch (err) {
      console.log(err.message);
    }
  }

  async function readRoundContributions(address: `0x${string}`, roundId: BigNumberish) {
    const network  = (await provider.getNetwork())
    // const endpoint = process.env.NODE_ENV === 'test' ? process.env.TABLELAND_GATEWAY_LOCAL : process.env.NODE_ENV === 'development' ? process.env.TABLELAND_GATEWAY_TESTNET : process.env.TABLELAND_GATEWAY_MAINNET;
  const tableName = `susu_contribution_table_${network.chainId}_4`  //|| process.env.NODE_ENV === 'test' ? process.env.TABLELAND_GROUPS_TABLE_LOCAL : process.env.NODE_ENV === 'development' ? process.env.TABLELAND_GROUPS_TABLE_TESTNET : process.env.TABLELAND_GROUPS_TABLE_MAINNET;
    try {
      const db = new Database({ signer: provider });

      const query = `SELECT * FROM ${tableName} WHERE groupId='${address}' AND roundId='${roundId.toString()}';`;
      
      console.log(query, network);

      const { results } = await db.prepare(query).all();

      return results;
    } catch (err) {
      console.log(err.message);
    }
  }

  async function readUserWallets(address: `0x${string}`) {
    const network  = (await provider.getNetwork())
    // const endpoint = process.env.NODE_ENV === 'test' ? process.env.TABLELAND_GATEWAY_LOCAL : process.env.NODE_ENV === 'development' ? process.env.TABLELAND_GATEWAY_TESTNET : process.env.TABLELAND_GATEWAY_MAINNET;
  const tableName = `susu_wallets_table_${network.chainId}_2`  //|| process.env.NODE_ENV === 'test' ? process.env.TABLELAND_GROUPS_TABLE_LOCAL : process.env.NODE_ENV === 'development' ? process.env.TABLELAND_GROUPS_TABLE_TESTNET : process.env.TABLELAND_GROUPS_TABLE_MAINNET;
    try {
      const db = new Database({ signer: provider });

      const query = `SELECT * FROM ${tableName} WHERE owner='${address}';`;
      
      console.log(query, network);

      const { results } = await db.prepare(query).all();

      return results;
    } catch (err) {
      console.log(err.message);
    }
  }



  // Your application logic
  return  {
    readUserGroups,
    readGroupContributions,
    readUserWallets,
    readRoundContributions,
    readGroupsMembers
  }

}