// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "../uniswapv2/UniswapV2Pair.sol";

contract DefiKingdomSwapPairMock is UniswapV2Pair {
    constructor() public UniswapV2Pair() {}
}
