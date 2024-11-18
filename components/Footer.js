import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-center bg-black text-white py-4">
      <p>Copyright &copy; {currentYear} Get me a chai - All right reserved</p>
    </footer>
  )
}

export default Footer
