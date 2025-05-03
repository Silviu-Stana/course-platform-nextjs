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
                <UserButton />
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </div>
    );
};

export default Home;
