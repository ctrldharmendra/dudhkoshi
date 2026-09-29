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

// PROJECT OVERVIEW SECTION
export const getTechnicalParameter = createAsyncThunk(
  'getTechnicalParameter',
  async ( _, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/api/admin/projectoverview`);
      return data?.data;
    } catch (err) {
        console.log(err)
      toast.error(err.response?.data?.message || 'Failed');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const createTechnicalParameter = createAsyncThunk(
  'createTechnicalParameter',
  async ( formData, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(`/api/admin/projectoverview`,
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
export const updateTechnicalParameter = createAsyncThunk(
  'updateTechnicalParameter',
  async ( {formData, id},  thunkAPI) => {
    try {
      const { data } = await axiosInstance.put(`/api/admin/projectoverview/${id}`,
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
export const deleteTechnicalParameter = createAsyncThunk(
  'deleteTechnicalParameter',
  async ( {id},  thunkAPI) => {
    try {
      const { data } = await axiosInstance.delete(`/api/admin/projectoverview/${id}`);
      return data;
    } catch (err) {
        console.log(err)
      toast.error(err.response?.data?.message || 'Failed');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
// PROJECT OVERVIEW SECTION END

// WIRE SYSTEM (WATER TO WIRE) SECTION
export const getWireSystem = createAsyncThunk(
  'getWireSystem',
  async ( _, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/api/admin/projectoverview/wiresys/water`);
      return data?.data;
    } catch (err) {
        console.log(err)
      toast.error(err.response?.data?.message || 'Failed');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const createWireSystem = createAsyncThunk(
  'createWireSystem',
  async ( formData, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(`/api/admin/projectoverview/wiresys/water`,
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
export const updateWireSystem = createAsyncThunk(
  'updateWireSystem',
  async ( {formData, id},  thunkAPI) => {
    try {
      const { data } = await axiosInstance.put(`/api/admin/projectoverview/wiresys/water/${id}`,
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
export const deleteWireSystem = createAsyncThunk(
  'deleteWireSystem',
  async ( {id},  thunkAPI) => {
    try {
      const { data } = await axiosInstance.delete(`/api/admin/projectoverview/wiresys/water/${id}`);
      return data;
    } catch (err) {
        console.log(err)
      toast.error(err.response?.data?.message || 'Failed');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
// WIRE SYSTEM SECTION END

// POWER EVACUATION SECTION
export const getPowerEvacuation = createAsyncThunk(
  'getPowerEvacuation',
  async ( _, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/api/admin/projectoverview/power/evacuation`);
      return data?.data;
    } catch (err) {
        console.log(err)
      toast.error(err.response?.data?.message || 'Failed');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const updatePowerEvacuation = createAsyncThunk(
  'updatePowerEvacuation',
  async ( {formData, id},  thunkAPI) => {
    try {
      const { data } = await axiosInstance.put(`/api/admin/projectoverview/power/evacuation/${id}`,
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
// POWER EVACUATION SECTION END

// GALLERY SECTION
export const getGallery = createAsyncThunk(
  'getGallery',
  async ( _, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/api/admin/gallery`);
      return data?.data;
    } catch (err) {
        console.log(err)
      toast.error(err.response?.data?.message || 'Failed');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const addGalleryImage = createAsyncThunk(
  'addGalleryImage',
  async ( {formData},  thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(`/api/admin/gallery`,
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
export const updateGalleryImage = createAsyncThunk(
  'updateGalleryImage',
  async ( {formData, id},  thunkAPI) => {
    try {
      const { data } = await axiosInstance.put(`/api/admin/gallery/${id}`,
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
export const deleteGalleryImage = createAsyncThunk(
  'deleteGalleryImage',
  async ( {id},  thunkAPI) => {
    try {
      const { data } = await axiosInstance.delete(`/api/admin/gallery/${id}`);
      return data;
    } catch (err) {
        console.log(err)
      toast.error(err.response?.data?.message || 'Failed');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
// GALLERY SECTION END

// MISC (SITE CONFIGURATION) SECTION
export const getMisc = createAsyncThunk(
  'getMisc',
  async ( _, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/api/admin/misc`);
      return data?.data;
    } catch (err) {
        console.log(err)
      toast.error(err.response?.data?.message || 'Failed');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const updateMisc = createAsyncThunk(
  'updateMisc',
  async ( {formData},  thunkAPI) => {
    try {
      const { data } = await axiosInstance.put(`/api/admin/misc`,
         formData
    );
      return data;
    } catch (err) {
        console.log(err)
      // the backend can put the text in `message` or `errors`, and either value
      // may arrive as an array
      const apiError =
        err.response?.data?.errors ||
        err.response?.data?.message ||
        err.message ||
        'Failed';
      const message = Array.isArray(apiError)
        ? apiError.filter(Boolean).join(', ')
        : apiError;
      const statusCode = err.response?.data?.statusCode || err.response?.status;
      toast.error(message || 'Failed');
      return thunkAPI.rejectWithValue({ message: message || 'Failed', statusCode });
    }
  }
);
// MISC SECTION END

// FAQ SECTION
export const getFaqs = createAsyncThunk(
  'getFaqs',
  async ( _, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/api/admin/faqs`);
      return data?.data;
    } catch (err) {
        console.log(err)
      toast.error(err.response?.data?.message || 'Failed');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const createFaq = createAsyncThunk(
  'createFaq',
  async ( {formData},  thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(`/api/admin/faqs`,
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
export const updateFaq = createAsyncThunk(
  'updateFaq',
  async ( {formData, id},  thunkAPI) => {
    try {
      const { data } = await axiosInstance.put(`/api/admin/faqs/${id}`,
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
export const deleteFaq = createAsyncThunk(
  'deleteFaq',
  async ( {id},  thunkAPI) => {
    try {
      const { data } = await axiosInstance.delete(`/api/admin/faqs/${id}`);
      return data;
    } catch (err) {
        console.log(err)
      toast.error(err.response?.data?.message || 'Failed');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
// FAQ SECTION END

// MESSAGES (CONTACT US) SECTION
export const getMessages = createAsyncThunk(
  'getMessages',
  async ( _, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/api/admin/contacts`);
      return data?.data;
    } catch (err) {
        console.log(err)
      toast.error(err.response?.data?.message || 'Failed');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const deleteMessage = createAsyncThunk(
  'deleteMessage',
  async ( {id},  thunkAPI) => {
    try {
      const { data } = await axiosInstance.delete(`/api/admin/contacts/${id}`);
      return data;
    } catch (err) {
        console.log(err)
      toast.error(err.response?.data?.message || 'Failed');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
// MESSAGES SECTION END

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

    technicalParameters:null,
    technicalParametersLoading:false,

    wireSystems:null,
    wireSystemsLoading:false,

    powerEvacuation:null,
    powerEvacuationLoading:false,

    gallery:null,
    galleryLoading:false,

    misc:null,
    miscLoading:false,

    faqs:null,
    faqsLoading:false,

    messages:null,
    messagesLoading:false,

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
      // get technical parameters 
      builder
      .addCase(getTechnicalParameter.pending, (state) => {
        state.technicalParametersLoading = true;
      })
      .addCase(getTechnicalParameter.fulfilled, (state, action) => {
        state.technicalParametersLoading = false;
        state.technicalParameters = action.payload;
      })
      .addCase(getTechnicalParameter.rejected, (state, action) => {
        state.technicalParametersLoading = false;    
      });
      // get wire systems (water to wire)
      builder
      .addCase(getWireSystem.pending, (state) => {
        state.wireSystemsLoading = true;
      })
      .addCase(getWireSystem.fulfilled, (state, action) => {
        state.wireSystemsLoading = false;
        state.wireSystems = action.payload;
      })
      .addCase(getWireSystem.rejected, (state, action) => {
        state.wireSystemsLoading = false;    
      });
      // get power evacuation
      builder
      .addCase(getPowerEvacuation.pending, (state) => {
        state.powerEvacuationLoading = true;
      })
      .addCase(getPowerEvacuation.fulfilled, (state, action) => {
        state.powerEvacuationLoading = false;
        state.powerEvacuation = action.payload;
      })
      .addCase(getPowerEvacuation.rejected, (state, action) => {
        state.powerEvacuationLoading = false;    
      });
      // get gallery
      builder
      .addCase(getGallery.pending, (state) => {
        state.galleryLoading = true;
      })
      .addCase(getGallery.fulfilled, (state, action) => {
        state.galleryLoading = false;
        state.gallery = action.payload;
      })
      .addCase(getGallery.rejected, (state, action) => {
        state.galleryLoading = false;    
      });
      // get miscellaneous (site configuration)
      builder
      .addCase(getMisc.pending, (state) => {
        state.miscLoading = true;
      })
      .addCase(getMisc.fulfilled, (state, action) => {
        state.miscLoading = false;
        state.misc = action.payload;
      })
      .addCase(getMisc.rejected, (state, action) => {
        state.miscLoading = false;    
      });
      // get faqs
      builder
      .addCase(getFaqs.pending, (state) => {
        state.faqsLoading = true;
      })
      .addCase(getFaqs.fulfilled, (state, action) => {
        state.faqsLoading = false;
        state.faqs = action.payload;
      })
      .addCase(getFaqs.rejected, (state, action) => {
        state.faqsLoading = false;    
      });
      // get messages (contact us)
      builder
      .addCase(getMessages.pending, (state) => {
        state.messagesLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messagesLoading = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.messagesLoading = false;    
      });
  },
});

export default landingAdminSectionSlice.reducer;