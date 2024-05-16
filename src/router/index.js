import AdminLayout from '../Layouts/AdminLayout';
import DefaultLayout from '../Layouts/DefaultLayout';
import config from '../config';
import AdminPage from '../pages/Admin/AdminPage';
import CashierPage from '../pages/Admin/CashierPage';
import ChargePage from '../pages/ChargePage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ManageProductPage from '../pages/Admin/ManageProductPage';
import NotFoundPage from '../pages/NotFoundPage';
import RegisterPage from '../pages/RegisterPage';
import SolutionPage from '../pages/SolutionPage';
import SupportPage from '../pages/SupportPage';
import ManageBillPage from '../pages/Admin/ManageBillPage';
import IEManage from '../pages/Admin/IEManage';
import AdminOwnerPage from '../pages/AdminOwner/AdminOwnerPage';

export const privateRoutes = [
	{
		path: config.routes.cashier,
		page: CashierPage,
		layout: null
		// protected: ProtectedRoute
	},
	{
		path: config.routes.admin,
		page: AdminPage,
		layout: AdminLayout
		// protected: ProtectedRoute
	},

	{
		path: config.routes.manageProduct,
		page: ManageProductPage,
		layout: AdminLayout
		// protected: ProtectedRoute
	},

	{
		path: config.routes.manageBill,
		page: ManageBillPage,
		layout: AdminLayout
		// protected: ProtectedRoute
	},

	{
		path: config.routes.ieManage,
		page: IEManage,
		layout: AdminLayout
		// protected: ProtectedRoute
	},
	{
		path: config.routes.adminOwnerPage,
		page: AdminOwnerPage,
		layout: null
		// protected: ProtectedRoute
	}
];

export const routes = [
	{
		path: config.routes.home,
		page: HomePage
	},
	{
		path: config.routes.login,
		page: LoginPage,
		layout: null
	},

	{
		path: config.routes.register,
		page: RegisterPage,
		layout: null
	},

	{
		path: config.routes.notfound,
		page: NotFoundPage
	},
	{
		path: `${config.routes.solution}/:id`,
		page: SolutionPage,
		layout: DefaultLayout
	},
	{
		path: config.routes.charge,
		page: ChargePage,
		layout: DefaultLayout
	},
	{
		path: config.routes.support,
		page: SupportPage,
		layout: DefaultLayout
	}
];
