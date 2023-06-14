import { ToastContainer } from 'react-toastify'
import './globals.css'
import { Poppins } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css';

const poppins = Poppins({ variable: '--font-poppins', subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata = {
  title: 'Todo App',
  description: 'A Todo app description',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} bg-slate-900 text-white/80`}>
        {children}
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  )
}
