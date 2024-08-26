// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

// import LoginPage from "./components/LoginPage/LoginPage";
// import Category from "./components/Category/Category";
// import Billing from "./components/Billing/Billing";
// import HomePage from "./components/HomePage/HomePage";
// import Table from "./components/Table/Table";
// import ViewCategory from "./components/AddCategory/ViewCategory";
// import ViewProduct from "./components/AddProduct/ViewProduct";
// import Report from "./components/Report/Report";
// import Setting from "./components/UpdateSetting/Setting";
// import UpdateSetting from "./components/UpdateSetting/UpdateSetting";
// import Invoice from "./components/Invoice/Invoice";
// import PrintableBill from "./components/PrintableBill/PrintableBill";
// import Cart from "./components/Cart/Cart";
// const App = () => {
//   const [settings, setSettings] = useState([]);

//   const addSetting = (newSetting) => {
//     setSettings((prevSettings) => [...prevSettings, newSetting]);
//   };

//   const updateSetting = (updatedSetting) => {
//     setSettings((prevSettings) =>
//       prevSettings.map((setting) =>
//         setting.id === updatedSetting.id ? updatedSetting : setting
//       )
//     );
//   };

//   const deleteSetting = (id) => {
//     setSettings((prevSettings) =>
//       prevSettings.filter((setting) => setting.id !== id)
//     );
//   };

//   return (
//     <div className="app">
//       <Router>
//         <Routes>
//           <Route path="/" element={<LoginPage />} />
//           <Route path="table" element={<Table />} />
//           <Route path="/categories" element={<Category />} />
//           <Route path="/billing" element={<Billing />} />
//           <Route path="/homePage" element={<HomePage />} />
//           <Route path="/view-category" element={<ViewCategory />} />
//           <Route path="/view-product" element={<ViewProduct />} />
//           <Route path="/report" element={<Report />} />
//           <Route path="/invoice" element={<Invoice />} />
//           <Route path="./printable-bill" element={<PrintableBill />} />
//           <Route path="./page" element={<Cart />} />
//           <Route
//             path="/setting"
//             element={<Setting addSetting={addSetting} />}
//           />
//           <Route
//             path="/updatesetting"
//             element={
//               <UpdateSetting
//                 settings={settings}
//                 updateSetting={updateSetting}
//                 deleteSetting={deleteSetting}
//               />
//             }
//           />
//         </Routes>
//       </Router>
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import LoginPage from "./components/LoginPage/LoginPage";
import Category from "./components/Category/Category";
import Billing from "./components/Billing/Billing";
import HomePage from "./components/HomePage/HomePage";
import Table from "./components/Table/Table";
import ViewCategory from "./components/AddCategory/ViewCategory";
import ViewProduct from "./components/AddProduct/ViewProduct";
import Report from "./components/Report/Report";
import Setting from "./components/UpdateSetting/Setting";
import UpdateSetting from "./components/UpdateSetting/UpdateSetting";
import Invoice from "./components/Invoice/Invoice";
import PrintableBill from "./components/PrintableBill/PrintableBill";
import Cart from "./components/Cart/Cart";

const App = () => {
  const [settings, setSettings] = useState([]);

  const addSetting = (newSetting) => {
    setSettings((prevSettings) => [...prevSettings, newSetting]);
  };

  const updateSetting = (updatedSetting) => {
    setSettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting.id === updatedSetting.id ? updatedSetting : setting
      )
    );
  };

  const deleteSetting = (id) => {
    setSettings((prevSettings) =>
      prevSettings.filter((setting) => setting.id !== id)
    );
  };

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/table" element={<Table />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/view-category" element={<ViewCategory />} />
          <Route path="/view-product" element={<ViewProduct />} />
          <Route path="/report" element={<Report />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/printable-bill" element={<PrintableBill />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/setting"
            element={<Setting addSetting={addSetting} />}
          />
          <Route
            path="/updatesetting"
            element={
              <UpdateSetting
                settings={settings}
                updateSetting={updateSetting}
                deleteSetting={deleteSetting}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
