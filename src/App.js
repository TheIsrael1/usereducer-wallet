import { useReducer, useState } from "react";
import Wallets from "./Wallets";

const Actions = {
  CREATE_WALLET: "CREATE_WALLET",
};

const reducer = (wallets, action) => {
  switch (action.type) {
    case Actions.CREATE_WALLET:
      return [...wallets, newWallet(action.payload, wallets.length)];
    default:
      return wallets;
  }
};

const newWallet = (newItem, currId) => {
  return {
    wallet_id: currId + 1,
    walletBalance: 0,
    walletName: newItem.walletName,
    walletCurrency: newItem.walletCurrency,
  };
};

const App = () => {
  const user = {
    name: "Elon Musk",
    userType: "Premium",
    networth: { currency: "NGN", amount: 50000 },
  };
  const [wallets, dispatch] = useReducer(reducer, [
    {
      wallet_id: 1,
      walletBalance: user.networth.amount,
      walletCurrency: user.networth.currency,
      walletName: "Primary Wallet",
    },
  ]);
  const [viewForm, setViewForm] = useState(false);
  const [newformDetails, setNewFormDetails] = useState({
    formData: { walletName: "", walletCurrency: "NGN" },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: Actions.CREATE_WALLET,
      payload: { walletName: newformDetails.formData.walletName, walletCurrency: newformDetails.formData.walletCurrency },
    });
    setViewForm(false)
    setNewFormDetails({
      formData: { walletName: "", walletCurrency: "NGN" },
    })
  };

  return (
    <div
      style={{
        margin: "3rem",
        backgroundColor: "#f9f9f9",
        color: "",
        padding: "1rem",
        height: "80vh",
      }}
    >
      <div>
        <h1 style={{ color: "goldenrod" }}>Bank of America</h1>
      </div>
      <div>
        <div style={{ marginBottom: "8px" }}>name: {user.name}</div>
        <div style={{ marginBottom: "8px" }}>User Type: {user.userType}</div>
        <div style={{ marginBottom: "8px" }}>Total networth:</div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          margin: "16px 0",
        }}
      >
        All Wallets:{" "}
        {wallets?.map?.((item, idx) => (
          <Wallets key={idx} item={item} />
        ))}
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <span
            style={{ fontSize: "30px", marginLeft: "2px", marginTop: "-4px" }}
          >
            +
          </span>
          <span
            style={{ fontSize: "14px", marginRight: "8px" }}
            onClick={() => setViewForm(true)}
          >
            Create new wallet
          </span>
        </div>
      </div>
      {viewForm && (
        <form onSubmit={(e) => handleSubmit(e)}>
          <h4 style={{ marginBottom: "1rem", color: "goldenrod" }}>
            Setup New Wallet
          </h4>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: ".5rem" }}>Wallet Name</label>
            <input
              style={{
                width: "12rem",
                height: "2rem",
                padding: "4px .5rem",
                marginBottom: ".5rem",
                border: "1px solid grey",
              }}
              onChange={(e) =>
                setNewFormDetails((prev) => {
                  return {
                    formData: {
                      ...prev.formData,
                      walletName: e.target.value,
                    },
                  };
                })
              }
            />
            <label style={{ marginBottom: ".5rem" }}>Wallet Currency</label>
            <select
              style={{
                width: "13rem",
                height: "2rem",
                padding: "4px .5rem",
                marginBottom: ".5rem",
                border: "1px solid grey",
              }}
              onChange={(e) =>
                setNewFormDetails((prev) => {
                  return {
                    formData: {
                      ...prev.formData,
                      walletCurrency: e.target.value,
                    },
                  };
                })
              }
            >
              <option>NGN</option>
              <option>CAD</option>
              <option>EUR</option>
            </select>
            <button
              style={{
                width: "13rem",
                height: "2rem",
                padding: "4px .5rem",
                marginBottom: ".5rem",
                backgroundColor: "goldenrod",
                border: "none",
                fontSize: "16px",
                fontWeight: "500",
                color: "black",
                cursor: "pointer",
              }}
            >
              Create
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default App;
