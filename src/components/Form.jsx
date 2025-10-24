export function Form({children, formId, action, method, handleSubmit, encType}) {
    return(
        <form action={action} method={method} id={formId} onSubmit={handleSubmit} encType={encType}>
            {children}
        </form>
    )
}