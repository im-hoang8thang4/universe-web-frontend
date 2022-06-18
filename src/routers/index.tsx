import { Outlet, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthGuard } from '../components/auth';
import NavBar from '../components/navbar/nav-bar';
import { SocketProvider } from '../components/socket';
import { Authorize } from '../pages/authorize/authorize';
import ChatPage from '../pages/chat/chat-page';
import CreatePostPage from '../pages/create_post/create-post-page';
import EditInformationPage from '../pages/edit_information/edit-information-page';
import FriendRequestPage from '../pages/friend-request/friend-request-page';
import { Login } from '../pages/login/login';
import NewFeed from '../pages/new_feed/new-feed';
import PersonalPage from '../pages/personal_page/person-page';
import PostDetail from '../pages/personal_page/post-detail';
import Search from '../pages/search/search';
import { PersonSelectedPage } from '../pages/personal_page_selected/person-selected-page';
import { NotFound } from '../components/not-found';

export const AppRouter = (props: any) => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/authorize" element={<Authorize />} />
      <Route element={<AuthGuard />}>
        <Route
          element={
            <>
              <NavBar />
              <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <SocketProvider>
                <Outlet />
              </SocketProvider>
            </>
          }
        >
          <Route path=":userId" element={<PersonSelectedPage />} />
          <Route path="/" element={<NewFeed />} />
          <Route path="/me" element={<PersonalPage />} />
          <Route path="/direct" element={<ChatPage />} />
          <Route path="/direct/:boxId" element={<ChatPage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/post-detail">
            <Route path=":postId" element={<PostDetail />}></Route>
          </Route>
          <Route path="/search">
            <Route path=":searchValue" element={<Search />}></Route>
          </Route>
          <Route path="/edit-profile" element={<EditInformationPage />} />
          <Route path="/friends" element={<FriendRequestPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} /> {/* NOT FOUND PAGE */}
      <Route path="/not-found" element={<NotFound />} /> {/* NOT FOUND PAGE */}
    </Routes>
  );
};
