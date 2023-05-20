import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import types from './types';

const initialState = {
  jobPortals: [],
  jobPortalUrls: [],
  jobPortalData: [],
};

const urlsResponse = axios.get('../jobportals.json');
const portalUrls = urlsResponse.data;
// const jobData = [];

export const getPortalData = createAsyncThunk(
  /*
  types.GET_JOB_PORTALS,
  portalUrls.array.forEach(url => {
    async () => {
        const dataResponse = await axios.get(url)
        jobData.push(dataResponse);
    }
  });
  */
  async () => {
    const response = await axios.get(portalUrls);
    return response.data;
  },
);

const webcrawlerSlice = createSlice({
  name: 'webcrawler',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default webcrawlerSlice.reducer;
