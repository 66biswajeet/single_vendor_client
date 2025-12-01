import requests from "./httpServices";

const CustomProductServices = {
  getCustomProductSettings: async () => {
    return requests.get("/custom-products/settings");
  },

  updateCustomProductSettings: async (body) => {
    return requests.put("/custom-products/settings", body);
  },

  addShape: async (body) => {
    return requests.post("/custom-products/shapes", body);
  },

  updateShape: async (shapeId, body) => {
    return requests.put(`/custom-products/shapes/${shapeId}`, body);
  },

  deleteShape: async (shapeId) => {
    return requests.delete(`/custom-products/shapes/${shapeId}`);
  },

  addSizeRange: async (body) => {
    return requests.post("/custom-products/size-ranges", body);
  },

  updateSizeRange: async (sizeId, body) => {
    return requests.put(`/custom-products/size-ranges/${sizeId}`, body);
  },

  deleteSizeRange: async (sizeId) => {
    return requests.delete(`/custom-products/size-ranges/${sizeId}`);
  },
};

export default CustomProductServices;
