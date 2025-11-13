import { useAppSelector } from "@/stores/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const PassageBreadcrumb: React.FC<{ match?: any }> = () => {
  //   const passageId = match?.params?.id;
  const currentPassage = useAppSelector(
    (state) => state.passages.currentPassage
  );
  return <span>Passage {currentPassage?.title}</span>;
};

const routes = [
  { path: "/", breadcrumb: "Home" },
  { path: "/writing-section", breadcrumb: "Bài viết" },
  { path: "/practices", breadcrumb: "Pratices" },
  { path: "/practices/writing-section", breadcrumb: "Luyện tập viết" },
  { path: "/passages", breadcrumb: "Writing" },
  { path: "/practices/writing/:id", breadcrumb: PassageBreadcrumb },
  { path: "/auth", breadcrumb: "Xác thực" },
  { path: "/shadowing", breadcrumb: "Luyện nói theo" },
  { path: "/auth/login", breadcrumb: "Đăng nhập" },
  { path: "/auth/register", breadcrumb: "Đăng ký" },
];

function matchRoute(pathname: string, routePath: string) {
  // ví dụ routePath: "/practices/writing/:id"
  const pattern = "^" + routePath.replace(/:[^/]+/g, "[^/]+") + "$";
  const regex = new RegExp(pattern);
  return regex.test(pathname);
}

const Navbar: React.FC = () => {
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith("/auth");

  // tách pathname thành từng cấp: /practices/writing/123
  // → ["/practices", "/practices/writing", "/practices/writing/123"]
  const segments = pathname.split("/").filter(Boolean);
  const paths = segments.map((_, index) => {
    return "/" + segments.slice(0, index + 1).join("/");
  });

  // build list breadcrumbs dựa trên routes config
  const breadcrumbs = paths
    .map((url) => {
      const route = routes.find((r) => matchRoute(url, r.path));
      if (!route) return null;

      let node: React.ReactNode;
      if (typeof route.breadcrumb === "string") {
        node = route.breadcrumb;
      } else {
        const Component = route.breadcrumb;
        node = <Component />;
      }

      return { href: url, breadcrumb: node };
    })
    .filter(Boolean) as { href: string; breadcrumb: React.ReactNode }[];

  return (
    <nav className="bg-purple-50 shadow-md border-b border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {!isAuthPage && breadcrumbs.length > 0 && (
          <div className="pb-2 pt-2">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm">
                {breadcrumbs.map(({ href, breadcrumb }, index) => {
                  const isLast = index === breadcrumbs.length - 1;

                  return (
                    <li key={href} className="flex items-center">
                      {index > 0 && (
                        <svg
                          className="flex-shrink-0 h-4 w-4 text-gray-400 mx-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}

                      {isLast ? (
                        <span className="text-gray-500 font-medium">
                          {breadcrumb}
                        </span>
                      ) : (
                        <Link
                          href={href}
                          className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                        >
                          {breadcrumb}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;



