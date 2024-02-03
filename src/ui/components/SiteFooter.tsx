import { GithubCircle } from 'iconoir-react';

export default function SiteFooter() {
  return (
    <footer
      className="bg-white dark:bg-gray-900 w-full py-2 text-center
            border-t border-gray-200 dark:border-gray-600"
    >
      <p>This project is open source.</p>
      <a href="https://github.com/WhatTheFee-info" target="_blank">
        <GithubCircle className="inline-block" />
      </a>
    </footer>
  );
}
