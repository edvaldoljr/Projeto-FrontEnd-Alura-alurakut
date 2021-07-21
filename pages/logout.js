import nookies from 'nookies';
import {destroyCookie} from 'nookies';

export default function Logout(){
}

export async function getServerSideProps(context) {
    // nookies.destroy(context, "USER_TOKEN",{ path: '/'})
    destroyCookie(context, "USER_TOKEN",{ path: '/'})
    return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
    }
}