import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className="bg-gray-50 text-gray-900">
        <div className="min-h-screen flex">
          <aside className="w-64 bg-white border-r p-6 shadow-sm">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">MOZDEVZ</h1>

            <nav className="space-y-2">
              {[
                { name: "Home", link: "/" },
                { name: "Dashboard", link: "/dashboard" },
                { name: "Products", link: "/products" },
                { name: "Sales", link: "/sales" },
                { name: "Stock", link: "/stock" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-black transition"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </aside>

          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}