import { NextResponse } from "next/server";

export const GET = () => NextResponse.json([{
    id: 1,
}, {
    id: 2,
}, {
    id: 3,
}, {
    id: 4,
}]);