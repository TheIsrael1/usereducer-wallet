import React from 'react'

const Wallets = ({item}) => {
  return (
    <div 
         style={{margin: "0 8px", padding: "8px 16px", border: "1px dotted gray"}}
         >
           <div>
             Wallet Name: {item?.walletName}
           </div>
           <div>
             Wallet currency: {item?.walletCurrency}
           </div>
           <div>
             Wallet Balance: {item?.walletBalance}
           </div>
         </div>
  )
}

export default Wallets