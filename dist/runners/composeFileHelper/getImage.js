"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getImage = ({ build, image }) => {
    /**
     * If user provided an image via interface
     */
    if (typeof image === 'string' && image.length > 0) {
        return {
            image,
        };
    }
    /**
     * If user provided a build path to a Dockerfile
     */
    if (build) {
        return {};
    }
};
exports.default = getImage;
//# sourceMappingURL=getImage.js.map