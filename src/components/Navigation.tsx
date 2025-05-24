import Link from 'next/link';

const Navigation = () => {
    return (
        <nav className="bg-purple-600 p-4 shadow-lg">
            <ul className="flex space-x-4">
                <li>
                    <Link href="/" className="text-white hover:text-yellow-300">Home</Link>
                </li>
                <li>
                    <Link href="/login" className="text-white hover:text-yellow-300">Login</Link>
                </li>
                <li>
                    <Link href="/signup" className="text-white hover:text-yellow-300">Sign Up</Link>
                </li>
                <li>
                    <Link href="/dashboard" className="text-white hover:text-yellow-300">Dashboard</Link>
                </li>
                <li>
                    <Link href="/reading" className="text-white hover:text-yellow-300">Palm Reading</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;