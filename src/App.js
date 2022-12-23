import {Outlet, Navigate, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from './pages/Register'
import Main from "./pages/login-activity/Main";
import CreateOrganization from "./pages/login-activity/CreateOrganization";
import ProductPages from "./pages/login-activity/ProductPages";
import TagStore from "./pages/login-activity/TagStore";
import Guide from "./pages/login-activity/Guide";
import Support from "./pages/login-activity/Support";
import EnteredHeader from "./components/login-components/EnteredHeader";
import AsidePanel from "./components/login-components/AsidePanel";
import Brands from "./pages/login-activity/Brands";
import TokenPurchase from "./pages/login-activity/TokenPurchase";
import Credits from "./pages/login-activity/Credits";
import UserSettings from "./pages/login-activity/UserSettings";
import ManageBrand from "./pages/login-activity/ManageBrand";
import CreateBrand from "./pages/login-activity/CreateBrand";
import ProductStats from "./pages/login-activity/ProductStats";
import CreateManageProduct from "./pages/login-activity/CreateManageProduct";
import ViewOrganization from "./pages/login-activity/ViewOrganization";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {refreshToken} from "./api/userAPI";
import {authenticateAction} from "./store/slices/userSlice";
import SuccessRegister from "./pages/SuccessRegister";
import ChangePassword from "./pages/ChangePassword";
import Verification from "./pages/login-activity/Verification";
import SignUp from "./pages/SignUp";
import Greeting from "./pages/Greeting";
import AppCss from "./assets/appCss.css"
import {Typography} from "@material-ui/core";

export const Layout = ({ children }) => {

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export const LoginLayout = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const username = useSelector(state => state.user.username)
    const isInitialize = useSelector(state => state.user.isInitialize)
    const dispatch = useDispatch()
    const [init, setInit] = useState(false)

    const parseJwt = (token) =>  {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }


    useEffect(async () => {
        localStorage.removeItem("csrftoken")
        await refreshToken().then(response => {
                if (response.access){
                    const access = response.access
                    const isAuth = true
                    const isInitialize = true
                    const user = parseJwt(response.access)
                    const userId = user.user_id
                    const username = user.username
                    const email = user.email
                    const isOrganization = user.organization !== null
                    dispatch(authenticateAction({userId, username, email, access, isOrganization, isAuth, isInitialize}))
                    setInit(true)
                }
            }
        ).catch(() => {
            setInit(true)
        })
    })

    // if(!isInitialize && init) return (
    //     <>
    //         <Typography variant={"h4"} style={{width: '100%', textAlign: 'center', marginTop: '50px', letterSpacing: '0.1rem'}}>
    //             You don't have an access to the current page
    //         </Typography>
    //     </>
    // )

    return (
        <>
            {/*{init && (*/}
            {/*     <>*/}
            {/*         {isAuth === true ? (*/}
                         <>
                            <EnteredHeader username={username}/>
                            <AsidePanel>
                                <Outlet />
                            </AsidePanel>
                         </>
             {/*        ) : (*/}
             {/*            <h1 style={{width: '100%', textAlign: 'center', marginTop: '50px'}}>UNAUTHENTICATED</h1>*/}
             {/*        )}*/}
             {/*    </>*/}
             {/*)}*/}
        </>
    )
}

const App = () => {
  return (
      <Routes>
          <Route exact path={'/'} element={<Greeting/>} />
          <Route exact path={'/login'} element={<Greeting login/>} />
          <Route exact path={'/register'} element={<Layout><Register/></Layout>}/>
          <Route exact path={'/sign-up'} element={<SignUp/>}/>
          <Route exact path={'/success-register'} element={<SuccessRegister/>}/>
          <Route path={'/change-password'} element={<ChangePassword />} />
          <Route path={'/verification-page'} element={<Verification />} />
          <Route path={'/password-reset-confirm/*'} element={<Navigate to="/change-password" replace />}/>
          <Route path={'/account-page'} element={<LoginLayout />}>
              <Route path={''} element={<Main />} />
              <Route path={'personal-settings'} element={<UserSettings />} />
              <Route path={'business-settings/setup'} element={<CreateOrganization/>} />
              <Route path={'business-settings/organization-view'} element={<ViewOrganization />} />
              <Route path={'business-settings/brands'} element={<Brands/>} />
              <Route path={'business-settings/brands/manage-brand/:id'} element={<ManageBrand/>} />
              <Route path={'business-settings/brands/create-brand'} element={<CreateBrand/>} />
              <Route path={'business-settings/token-purchase'} element={<TokenPurchase/>} />
              <Route path={'product-pages'} element={<ProductPages/>} />
              <Route path={'product-pages/create-page'} element={<CreateManageProduct/>} />
              <Route path={'product-pages/edit-page'} element={<CreateManageProduct edit/>} />
              <Route path={'product-pages/page-stats'} element={<ProductStats />} />
              <Route path={'tag-store/tags'} element={<TagStore/>} />
              <Route path={'tag-store/credits'} element={<Credits/>} />
              <Route path={'guide'} element={<Guide/>} />
              <Route path={'support'} element={<Support/>} />
          </Route>
          <Route
              path="*"
              element={<Navigate to="/" replace />}
          />
      </Routes>
  )
}

export default App
