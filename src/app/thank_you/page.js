import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import React from 'react'

export default async function page() {
  const SECRET = process.env.COOKIE_SECRET;
  const cookie = cookies().get('purchase')?.value;

  if (!cookie) {
    return <div>Error page</div>;
  }

  verify(cookie, SECRET, function (err, value) {
    if (err || !value || !value.pay_state) {
      return <div>Error page</div>;
    }
  });

  return (
    <div>thank_you</div>
  );
}