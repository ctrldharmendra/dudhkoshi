import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axiosInstance from "@/lib/axiosInstance"; 


// HERO SECTION 
export const getHero = createAsyncThunk(
  'getHero',
  async ( _, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/api/admin/hero`);
      return data?.data;
    } catch (err) {
        console.log(err)
      toast.error(err.response?.data?.message || 'Failed');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const editHeroSection = createAsyncThunk(
  'editHeroSection',
  async ( {formData},  thunkAPI) => {
    try {
      const { data } = await axiosInstance.put(`/api/admin/hero`, 
         formData
    );
      return data;
    } catch (err) {
        console.log(err)
      toast.error(err.response?.data?.message || 'Failed');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
// HERO SECTION  END

// HERO CARDS 
export const getHeroCards = createAsyncThunk(
  'getHeroCards',
  async ( _, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/api/admin/hero/card/`);
      return data?.data;
    } catch (err) {
        console.log(err)
      toast.error(err.response?.data?.message || 'Failed');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const updateHeroCard = createAsyncThunk(
  'updateHeroCard',
  async ( {formData, id},  thunkAPI) => {
    try {
      const { data } = await axiosInstance.put(`/api/admin/hero/card/${id}`, 
         formData
    );
      return data;
    } catch (err) {
        console.log(err)
      toast.error(err.response?.data?.message || 'Failed');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
// HERO CARDS END
// ABOUTUS SECTION 
export const getAboutTechnicalSpecs = createAsyncThunk(
  'getAboutTechnicalSpecs',
  async ( _, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/api/admin/aboutus/technicalspc`);
      return data?.data;
    } catch (err) {
        console.log(err)
      toast.error(err.response?.data?.message || 'Failed');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const updateAboutTechnicalSpecs = createAsyncThunk(
  'updateAboutTechnicalSpecs',
  async ( {formData, id},  thunkAPI) => {
    try {
      const { data } = await axiosInstance.put(`/api/admin/aboutus/technicalspc/${id}`, 
         formData
    );
      return data;
    } catch (err) {
        console.log(err)
      toast.error(err.response?.data?.message || 'Failed');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const getAboutSpatialConstrants = createAsyncThunk(
  'getAboutSpatialConstrants',
  async ( _, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/api/admin/aboutus/spatialconstraints`);
      return data?.data;
    } catch (err) {
        console.log(err)
      toast.error(err.response?.data?.message || 'Failed');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const updateAboutSpatialConstrants = createAsyncThunk(
  'updateAboutSpatialConstrants',
  async ( {formData, id},  thunkAPI) => {
    try {
      const { data } = await axiosInstance.put(`/api/admin/aboutus/spatialconstraints/${id}`, 
         formData
    );
      return data;
    } catch (err) {
        console.log(err)
      toast.error(err.response?.data?.message || 'Failed');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
// ABOUTUS SECTION END 
 
// TEAM SECTION 
export const getTeam = createAsyncThunk(
  'getTeam',
  async ( _, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/api/admin/team`);
      return data?.data;
    } catch (err) {
        console.log(err)
      toast.error(err.response?.data?.message || 'Failed');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const addTeam = createAsyncThunk(
  'addTeam',
  async ( {formData, id},  thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(`/api/admin/team`, 
         formData
    );
      return data;
    } catch (err) {
        console.log(err)
      toast.error(err.response?.data?.message || 'Failed');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const updateTeam = createAsyncThunk(
  'updateTeam',
  async ( {formData, id},  thunkAPI) => {
    try {
      const { data } = await axiosInstance.put(`/api/admin/team/${id}`, 
         formData
    );
      return data;
    } catch (err) {
        console.log(err)
      toast.error(err.response?.data?.message || 'Failed');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const deleteTeam = createAsyncThunk(
  'deleteTeam',
  async ( {_, id},  thunkAPI) => {
    try {
      const { data } = await axiosInstance.delete(`/api/admin/team/${id}`);
      return data;
    } catch (err) {
        console.log(err)
      toast.error(err.response?.data?.message || 'Failed');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
// TEAM SECTION END


const landingAdminSectionSlice = createSlice({
  name: 'landingAdminSectionSlice',
  initialState: {

    heroSection:null,
    heroSecLoading:false,

    heroCards:null,
    heroCardsLoading:false,

    aboutTechnicalSpecs:null,
    aboutTechnicalSpecsLoading:false,

    aboutSpatialConstrants:null,
    aboutSpatialConstrantsLoading:false,

    team:null,
    teamLoading:false,


    error: "",
    lastFetched: "",
  },
  reducers: {},

  extraReducers: (builder) => {
    // get hero 
    builder
      .addCase(getHero.pending, (state) => {
        state.heroSecLoading = true;
      })
      .addCase(getHero.fulfilled, (state, action) => {
        state.heroSecLoading = false;
        state.heroSection = action.payload;
      })
      .addCase(getHero.rejected, (state, action) => {
        state.heroSecLoading = false;    
      });
// get hro cards 
    builder
      .addCase(getHeroCards.pending, (state) => {
        state.heroCardsLoading = true;
      })
      .addCase(getHeroCards.fulfilled, (state, action) => {
        state.heroCardsLoading = false;
        state.heroCards = action.payload;
      })
      .addCase(getHeroCards.rejected, (state, action) => {
        state.heroCardsLoading = false;    
      });
      // get about use technical specification
      builder
      .addCase(getAboutTechnicalSpecs.pending, (state) => {
        state.aboutTechnicalSpecsLoading = true;
      })
      .addCase(getAboutTechnicalSpecs.fulfilled, (state, action) => {
        state.aboutTechnicalSpecsLoading = false;
        state.aboutTechnicalSpecs = action.payload;
      })
      .addCase(getAboutTechnicalSpecs.rejected, (state, action) => {
        state.aboutTechnicalSpecsLoading = false;    
      }); 
      // get about us spatial constraints
      builder
      .addCase(getAboutSpatialConstrants.pending, (state) => {
        state.aboutSpatialConstrantsLoading = true;
      })
      .addCase(getAboutSpatialConstrants.fulfilled, (state, action) => {
        state.aboutSpatialConstrantsLoading = false;
        state.aboutSpatialConstrants = action.payload;
      })
      .addCase(getAboutSpatialConstrants.rejected, (state, action) => {
        state.aboutSpatialConstrantsLoading = false;    
      });
      // get team 
      builder
      .addCase(getTeam.pending, (state) => {
        state.teamLoading = true;
      })
      .addCase(getTeam.fulfilled, (state, action) => {
        state.teamLoading = false;
        state.team = action.payload;
      })
      .addCase(getTeam.rejected, (state, action) => {
        state.teamLoading = false;    
      });
  },
});

export default landingAdminSectionSlice.reducer;