import React from "react";
import { useList } from "@pankod/refine-core";

import {
    PieChart,
    PropertyReferrals,
    TotalRevenue,
    TopAgent,
    PropertyCard,
} from "components";
import { Box, Typography, Stack } from "@pankod/refine-mui";

const home = () => {
    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142d">
                Dashboard
            </Typography>

            <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
                <PieChart
                    title="Properties for Sale"
                    value={684}
                    series={[75, 25]}
                    colors={["#275be8", "#c4b8ef"]}
                />

                <PieChart
                    title="Properties for Rent"
                    value={550}
                    series={[60, 40]}
                    colors={["#275be8", "#c4b8ef"]}
                />

                <PieChart
                    title="Total customers"
                    value={5684}
                    series={[75, 25]}
                    colors={["#275be8", "#c4b8ef"]}
                />

                <PieChart
                    title="Properties for Cities"
                    value={555}
                    series={[75, 25]}
                    colors={["#275be8", "#c4b8ef"]}
                />
            </Box>

            <Stack mt="25px" width="100%" direction={{xs:"column", lg:"row"}} gap={4}>
                <TotalRevenue />
                <PropertyReferrals />
            </Stack>
        </Box>
    );
};

export default home;
