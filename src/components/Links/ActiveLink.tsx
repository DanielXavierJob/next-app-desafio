import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

export function ActiveLink(props: any) {
  const router = useRouter()

  const handleClick = (e: any) => {
    e.preventDefault()
    router.push(props.item.link)
  }

  return (
    props.item.link === router.asPath ? (
      <Fragment key={props.id}>
        {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
        <a href={props.item.link} onClick={handleClick} className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
          {props.item.name}
        </a>
      </Fragment>
    ) : (
      <a
        key={props.id}
        href={props.item.link}
        onClick={handleClick}
        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      >
        {props.item.name}
      </a>
    )
  )
}
export function ActiveItemMenu(props: any) {
  const router = useRouter();
  const handleClick = (e: any, href: any) => {
    e.preventDefault();
    router.push(href);
  }
  return (<a
    key={props.id}
    href={props.item.link}
    onClick={(e: any) => {handleClick(e, props.item.link)}}
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
  >
    {props.item.name}
  </a>);
}

export default ActiveLink