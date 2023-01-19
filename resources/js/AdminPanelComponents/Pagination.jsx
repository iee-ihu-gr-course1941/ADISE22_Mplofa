import {Link} from "@inertiajs/inertia-react";

export function Pagination({ links,className }) {
    const OrderLinks = links.links,
        Meta = links.meta;
    console.log('Links',OrderLinks);
    return (
        links.meta.links.length > 3 && (
            <nav aria-label="Page navigation" className={'text-center'}>
                <ul className={"pagination justify-content-center"}>
                    <li key={'previous'} className={"page-item " + (OrderLinks.prev === null ? ' disabled' : '')}>
                        <Link className={'page-link'} href={OrderLinks.prev === null ? '' : OrderLinks.prev}>
                             &laquo; Prev
                        </Link>
                    </li>
                    {
                        Meta.links.map((link) => {
                            if(link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;')
                                return  <li key={link.url} className={"page-item " + (link.active ? 'active ' : '')}>
                                    <Link className={'page-link'} href={link.url}>
                                        {link.label}
                                    </Link>
                                </li>
                        })
                    }
                    <li key={'next'} className={"page-item " + (OrderLinks.next === null ? ' disabled' : '')}>
                        <Link className={'page-link'} href={ OrderLinks.next === null ? '' : OrderLinks.next }>
                           Next &raquo;
                        </Link>
                    </li>
                </ul>
                <h6>Showing {Meta.from} - {Meta.to} of {Meta.total}</h6>
            </nav>
        )
    );
}
