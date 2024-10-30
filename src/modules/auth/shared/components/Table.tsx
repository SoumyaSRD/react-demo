const Table = (data: any) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    {data?.headers?.map((header: any) => {
                        return <th scope="col">{header.name}</th>;
                    })}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {data?.body?.map((eachData: any) => {
                        return data?.header?.map((header: any) => {
                            return <td>{eachData[header.name]}</td>;
                        });
                    })}
                </tr>
            </tbody>
        </table>
    );
};

export default Table;
