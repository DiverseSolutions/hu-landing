import { createAction } from "@reduxjs/toolkit";

export const alertVisibility = createAction<{
    isArtArtVisible?: false,
}>("ALERT_VISIBILITY")