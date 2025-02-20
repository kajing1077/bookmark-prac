'use client'

import { Button } from "@/components/ui/button";
import { login } from '../actions/sign'

export default function NaverLogin() {

  return <Button variant={'outline'} onClick={() => login('naver')}>
    Sign In with Naver

  </Button>
}