// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "forge-std/Test.sol";
import {Meety} from "../src/Meety.sol";

contract MeetyTest is Test {
    Meety nft;

    address owner = vm.addr(0x2);
    address publicMinter1 = vm.addr(0x3);
    address publicMinter2 = vm.addr(0x4);

    function setUp() public {
        nft = new Meety(owner);
    }

    function test_mint() public {
        vm.startPrank(publicMinter1);
        nft.safeMint(publicMinter2, "ipfs://your-ipfs-hash/");
        assertEq(nft.tokenURI(0), "ipfs://your-ipfs-hash/");
        assertEq(nft.tokenURI(1), "ipfs://your-ipfs-hash/");
    }

    function test_set_token_uri() public {
        vm.startPrank(publicMinter1);

        // mint tokens
        nft.safeMint(publicMinter2, "ipfs://your-ipfs-hash/");
        assertEq(nft.tokenURI(0), "ipfs://your-ipfs-hash/");
        assertEq(nft.tokenURI(1), "ipfs://your-ipfs-hash/");

        // Update tokenURI
        vm.startPrank(owner);
        nft.setTokenURI(1, "ipfs://your-ipfs-hash/2");
        assertEq(nft.tokenURI(1), "ipfs://your-ipfs-hash/2");
    }
}
