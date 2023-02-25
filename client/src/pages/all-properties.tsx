import {Add} from "@mui/icons-material";
import {useTable} from "@pankod/refine-core";
import {Box, Stack, TextField, Typography, Select, MenuItem} from "@pankod/refine-mui";
import {useNavigate} from "@pankod/refine-react-router-v6";

import {PropertyCard, CustomButton} from "components";
import {useMemo} from "react";

const AllProperties = () => {
    const navigate = useNavigate();
    const {
        tableQueryResult: {data, isLoading, isError},
        current,
        setCurrent,
        setPageSize,
        pageCount,
        sorter, setSorter,
        filters, setFilters
    } = useTable();

    const allProperties = data?.data ?? [];

    const currentPrice = sorter.find((item) => item.field === "price")?.order;

    const toggleSort = (field: string) => {
        setSorter([{field, order: currentPrice === "asc" ? "desc" : "asc"}]);
    };

    const currentFilterValues = useMemo(() => {
        const logicalFilters = filters.flatMap((item) => ("field" in item ? item : []));

        return {
            title: logicalFilters.find((item) => item.field === "title")?.value || "",
        }
    }, [filters]);

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Error</Typography>;

    return (
        <Box>
            <Box
                mt={"20px"}
                sx={{display: "flex", flexWrap: "wrap", gap: 3}}
            >
                <Stack
                    direction={"column"}
                    width={"100%"}
                >
                    <Typography
                        fontSize={25}
                        fontWeight={700}
                        color="#11142d"
                    >
                        {!allProperties.length ? "There are no properties" : "All Properties"}
                    </Typography>
                    <Box
                        mb={2}
                        mt={3}
                        display={"flex"}
                        width={"84%"}
                        justifyContent={"space-between"}
                        flexWrap={"wrap"}
                    >
                        <Box
                            display={"flex"}
                            gap={2}
                            flexWrap={"wrap"}
                            mb={{xs: "20px", sm: 0}}
                        >
                            <CustomButton
                                title={`Sort price ${currentPrice === "asc" ? "↑" : "↓"}`}
                                handleClick={() => toggleSort("price")}
                                backgroundColor={"#475be8"}
                                color={"#fcfcfc"}
                            />
                            <TextField
                                variant={"outlined"}
                                color={"info"}
                                placeholder={"Search by title"}
                                value={currentFilterValues.title}
                                onChange={(e) => {
                                    setFilters([
                                        {
                                            field: "title",
                                            operator: "contains",
                                            value: e.currentTarget.value ? e.currentTarget.value : undefined
                                        },
                                    ])
                                }}
                            />
                            <Select
                                variant={"outlined"}
                                color={"info"}
                                displayEmpty
                                required
                                inputProps={{"aria-label": "Without label"}}
                                defaultValue={""}
                                value={""}
                                onChange={() => {
                                }}
                            >
                                <MenuItem value={""}>All</MenuItem>
                            </Select>
                        </Box>
                    </Box>
                </Stack>
            </Box>

            <Stack
                direction="row"
                justifyContent={"space-between"}
                alignItems="center"
            >
                <CustomButton
                    title="Add Property"
                    handleClick={() => navigate("/properties/create")}
                    backgroundColor="#475be8"
                    color="#fcfcfc"
                    icon={<Add/>}
                />

            </Stack>

            <Box
                mt="20px"
                sx={{display: "flex", flexWrap: "wrap", gap: 3}}
            >
                {allProperties.map((property) => (
                    <PropertyCard
                        key={property._id}
                        id={property._id}
                        title={property.title}
                        price={property.price}
                        location={property.location}
                        photo={property.photo}
                        description={property.description}
                    />
                ))}
            </Box>

            {allProperties.length > 0 && (
                <Box
                    mt={3}
                    display={"flex"}
                    gap={2}
                    flexWrap={"wrap"}
                >
                    <CustomButton
                        title="Previous"
                        backgroundColor="#475be8"
                        color="#fcfcfc"
                        handleClick={() => setCurrent((prev) => prev - 1)}
                        disabled={!(current > 1)}
                    />

                    <Box
                        display={{xs: "hidden", sm: "flex"}}
                        alignItems={"center"}
                        gap={"5px"}
                    >
                        Page <strong>{current} of {pageCount}</strong>
                    </Box>

                    <CustomButton
                        title="Next"
                        backgroundColor="#475be8"
                        color="#fcfcfc"
                        handleClick={() => setCurrent((prev) => prev + 1)}
                        disabled={current === pageCount}
                    />

                    <Select
                        variant={"outlined"}
                        color={"info"}
                        displayEmpty
                        required
                        inputProps={{"aria-label": "Without label"}}
                        defaultValue={10}
                        onChange={() => {
                        }}
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <MenuItem
                                key={pageSize}
                                value={pageSize}
                            >Show {pageSize}</MenuItem>
                        ))}
                    </Select>

                </Box>
            )}
        </Box>
    );
};

export default AllProperties;
