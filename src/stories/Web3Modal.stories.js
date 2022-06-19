import React from 'react';
import { storiesOf } from '@storybook/react';

import {Web3Modal} from '../components/Web3Modal';

const stories = storiesOf('App Test', module);
const tokens = [
    {address: '0x01BE23585060835E02B77ef475b0Cc51aA1e0709', symbol: 'Link', decimal: '18', price:'1'},
    {address: '0xeb8f08a975Ab53E34D8a0330E0D34de942C95926', symbol: 'USDC', decimal: '6', price:'10'}
  ];
stories.add('App', ()=>{
    return(<Web3Modal 
        amount="0.001" 
        receiver="0xfe1167Cb42d0a06f0C2c64d4fE2708e12328e22E" 
        tokenNumber="2" 
        tokens={tokens}
        />);
});
