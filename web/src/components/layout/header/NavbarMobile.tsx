import { useState } from 'react';
import AccountConnect from './AccountConnect';

export default function NavbarMobile() {
  const [isMobileMenuOpen] = useState(false);

  if (isMobileMenuOpen) {
    return (
      <nav className="mx-2 flex flex-col gap-4 rounded-[25px] bg-opacity-50 p-2 backdrop-blur-2xl">
        <div
          className={[
            'flex flex-1 flex-grow items-center justify-between',
            'rounded-[50px] border border-stone-300 bg-opacity-10 p-4 backdrop-blur-2xl',
          ].join(' ')}
        >
          <div className="h-38 flex grow flex-row items-center justify-between gap-4">
            {/* <NavbarTitle /> */}
            <div>
              <AccountConnect />
            </div>
            {/* <button
              type="button"
              aria-label="Menu"
              data-state="open"
              onClick={toggleMobileMenuOpen}
            >
              <Cross1Icon width="24" height="24" />
            </button> */}
          </div>
        </div>
        {/* <div>
          <ul className="mx-2 flex flex-col gap-4">
            <li className="flex">
              <NavbarLink href="https://github.com/coinbase/build-onchain-apps" target="_blank">
                <Image alt="icon" width="24" height="24" src="/icon.png" />
              </NavbarLink>
            </li>
          </ul>
          <div className="mx-2 mt-4">
            <AccountConnect />
          </div>
        </div> */}
      </nav>
    );
  }

  return (
    <nav className="mx-2 flex flex-col gap-4 rounded-[25px] bg-opacity-50 p-2 backdrop-blur-2xl">
      <div
        className={[
          'flex flex-1 flex-grow items-center justify-between',
          'rounded-[50px] border border-stone-300 bg-opacity-10 p-4 backdrop-blur-2xl',
        ].join(' ')}
      >
        <div className="h-38 flex grow flex-row items-center justify-between gap-4">
          {/* <NavbarTitle /> */}
          <div>
            <AccountConnect />
          </div>
          {/* <button
          type="button"
          aria-label="Menu"
          data-state="open"
          onClick={toggleMobileMenuOpen}
        >
          <Cross1Icon width="24" height="24" />
        </button> */}
        </div>
      </div>
      {/* <div>
      <ul className="mx-2 flex flex-col gap-4">
        <li className="flex">
          <NavbarLink href="https://github.com/coinbase/build-onchain-apps" target="_blank">
            <Image alt="icon" width="24" height="24" src="/icon.png" />
          </NavbarLink>
        </li>
      </ul>
      <div className="mx-2 mt-4">
        <AccountConnect />
      </div>
    </div> */}
    </nav>
    // <nav
    //   className={[
    //     'flex flex-1 flex-grow items-center justify-between',
    //     'rounded-[50px] border border-stone-300 bg-white bg-opacity-10 p-4 backdrop-blur-2xl',
    //     'mx-4',
    //   ].join(' ')}
    // >
    //   <div className="flex h-8 grow items-center justify-between gap-4">
    //     <NavbarTitle />
    //     <button type="button" aria-label="Menu" data-state="closed" onClick={toggleMobileMenuOpen}>
    //       <HamburgerMenuIcon width="24" height="24" />
    //     </button>
    //   </div>
    // </nav>
  );
}
