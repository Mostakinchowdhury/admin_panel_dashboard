'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Setting_layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  return (
    <div className="p-3 md:p-6 overflow-y-auto grow flex flex-col gap-3 !overflow-hidden min-h-0 w-full min-w-0">
      {/* submenu section for settings */}
      <section className="bg-white p-4 overflow-x-auto scroll-hide">
        <ul className="flex items-center gap-3 md:gap-8">
          <li
            className={`${
              pathname == '/settings'
                ? 'rounded-md bg-green-100 txtstlh4 font-bold'
                : 'txtstlh4 font-semibold'
            } p-2 md:min-w-40 text-center select-none whitespace-nowrap shrink-0`}
          >
            <Link href={'/settings'}>My Profile</Link>
          </li>
          <li
            className={`${
              pathname == '/settings/edit_profile'
                ? 'p-2 rounded-md bg-green-100 txtstlh4 font-bold'
                : 'txtstlh4 font-semibold'
            } p-2 md:min-w-40 text-center select-none whitespace-nowrap shrink-0`}
          >
            <Link href={'/settings/edit_profile'}>Manage Profile</Link>
          </li>
          <li
            className={`${
              pathname == '/settings/change_password'
                ? 'p-2 rounded-md bg-green-100 txtstlh4 font-bold'
                : 'txtstlh4 font-semibold'
            } p-2 md:min-w-40 text-center select-none whitespace-nowrap shrink-0`}
          >
            <Link href={'/settings/change_password'}>Change Password</Link>
          </li>
          <li
            className={`${
              pathname == '/settings/delete_account'
                ? 'p-2 rounded-md bg-green-100 txtstlh4 font-bold'
                : 'txtstlh4 font-semibold'
            } p-2 md:min-w-40 text-center select-none whitespace-nowrap shrink-0`}
          >
            <Link href={'/settings/delete_account'}>Delete Account</Link>
          </li>
        </ul>
      </section>
      {/* main */}
      <main className="flex-1 bg-white p-4 h-full min-h-0">{children}</main>
    </div>
  )
}
