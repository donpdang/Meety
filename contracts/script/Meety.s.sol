// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Script, console2} from "forge-std/Script.sol";
import "../src/Meety.sol";

contract MeetyScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        Meety meetyNFT = new Meety(0xCD56df7B4705A99eBEBE2216e350638a1582bEC4);
        vm.stopBroadcast();
        console2.log("Meety address: ", address(meetyNFT));
    }
}
