import { createBrowserRouter } from 'react-router-dom';

import { AuthGuard } from './guard';
import Layout from './layout/layout';
import HomePage from './page/home';
import LoginPage from './page/login';
import LogoutPage from './page/logout';
import { PagePath } from './persistence/enums';

export const ROUTER = createBrowserRouter([
  {
    element: <AuthGuard />,
    children: [
      {
        path: PagePath.Login,
        element: <LoginPage />,
      },
      {
        path: PagePath.Logout,
        element: <LogoutPage />,
      },
      {
        element: <Layout />,
        children: [
          {
            path: PagePath.All,
            element: <HomePage />,
          },
          {
            path: PagePath.Users,
            element: <div>USERS</div>,
          },
          {
            path: PagePath.Fulfillments,
            element: <div>FULFILLMENTS</div>,
          },
          {
            path: PagePath.FulfillmentCenters,
            element: <div>FULFILLMENT CENTERS</div>,
          },
          {
            path: PagePath.Partners,
            element: <div>PARTNERS</div>,
          },
          {
            path: PagePath.PartnerChannels,
            element: <div>PARTNER CHANNELS</div>,
          },
          {
            path: PagePath.Products,
            element: <div>PRODUCTS</div>,
          },
          {
            path: PagePath.Gifts,
            element: <div>GIFTS</div>,
          },
          {
            path: PagePath.Orders,
            element: <div>ORDERS</div>,
          },
          {
            path: PagePath.Claims,
            element: <div>CLAIMS</div>,
          },
          {
            path: PagePath.Receivings,
            element: <div>RECEIVINGS</div>,
          },
          {
            path: PagePath.Releases,
            element: <div>RELEASES</div>,
          },
          {
            path: PagePath.Collections,
            element: <div>COLLECTIONS</div>,
          },
          {
            path: PagePath.Stocks,
            element: <div>STOCKS</div>,
          },
          {
            path: PagePath.Purchasers,
            element: <div>PURCHASERS</div>,
          },
          {
            path: PagePath.Consigners,
            element: <div>CONSIGNERS</div>,
          },
          {
            path: PagePath.Boxes,
            element: <div>BOXES</div>,
          },
          {
            path: PagePath.DeliveryCompanySettings,
            element: <div>DELIVERY COMPANY SETTINGS</div>,
          },
        ],
      },
    ],
  },
]);
