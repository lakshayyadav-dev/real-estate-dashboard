import { Place } from "@mui/icons-material";
import { Link } from "@pankod/refine-react-router-v6";
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Stack,
} from "@pankod/refine-mui";

import { PropertyCardProps } from "interfaces/property";

const PropertyCard = ({
    id,
    title,
    location,
    price,
    photo,
    description,
}: PropertyCardProps) => {
    return (
        <Card
            component={Link}
            to={`/properties/${id}`}
            elevation={0}
            sx={{
                maxWidth: "330px",
                padding: "10px",
                "&:hover": {
                    boxShadow: "0 22px 45px 2px rgba(176,176,176,0.1)",
                },
                cursor: "pointer",
                borderRadius: "10px",
                textDecoration: "none",
            }}
        >
            <CardMedia
                component={"img"}
                width={"100%"}
                height={210}
                image={photo}
                alt={`${title} image`}
                sx={{ borderRadius: "5px" }}
            />
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "10px",
                    paddingX: "5px",
                }}
            >
                <Stack direction="column" gap={2}>
                    <Typography fontSize={16} fontWeight={600} color="#11142d">
                        {title}
                    </Typography>
                    <Typography fontSize={14} fontWeight={500} mt={"10px"}>
                        {description.slice(0, 100)}...
                    </Typography>
                    <Stack direction="row" gap={0.5} alignItems={"center"}>
                        <Place
                            sx={{
                                fontSize: 18,
                                color: "#11142d",
                                marginTop: 0.5,
                            }}
                        />
                        <Typography fontSize={14} color="#808191">
                            {location}
                        </Typography>
                    </Stack>
                </Stack>
                <Box
                    px={1.5}
                    py={0.5}
                    borderRadius={1}
                    bgcolor="#dadefa"
                    height="fit-content"
                >
                    <Typography fontSize={12} fontWeight={600} color="#475be8">
                        ${price.toLocaleString()}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PropertyCard;
