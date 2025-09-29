export function Form({children, formId, action, method}) {
    return(
        <form action={action} method={method} id={formId}>
            {children}
        </form>
    )
}