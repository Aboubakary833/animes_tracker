const Container = ({children, className}) => {
    return  <div className={`container mx-auto ${className ? className : null}`}>
                {children}
            </div>
}

export default Container