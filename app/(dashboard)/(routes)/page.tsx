import {
    RedirectToSignIn,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs';

const Home = () => {
    return (
        <div>
            <SignedIn>
                {/* Show the UserButton when signed in */}
                <UserButton afterSignOutUrl="/sign-in" />
            </SignedIn>
            <SignedOut>
                {/* Redirect to /sign-in when signed out */}
                <RedirectToSignIn />
            </SignedOut>
        </div>
    );
};

export default Home;
