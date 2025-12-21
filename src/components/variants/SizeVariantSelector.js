import { useState } from "react";
import useUtilsFunction from "@hooks/useUtilsFunction";
import SizeHelpModal from "@components/modal/SizeHelpModal";

const SizeVariantSelector = ({
  sizeVariants,
  selectedSize,
  selectedTier,
  onSizeChange,
  onTierChange,
  onContinue,
}) => {
  const { showingTranslateValue, currency } = useUtilsFunction();
  const [isCustomSize, setIsCustomSize] = useState(false);
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");
  const [isCustomQuantity, setIsCustomQuantity] = useState(false);
  const [customQuantity, setCustomQuantity] = useState("");
  const [customQuantityError, setCustomQuantityError] = useState("");
  const [isSizeHelpModalOpen, setIsSizeHelpModalOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      {/* Size Selection Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold text-gray-900">Select a size</h4>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsSizeHelpModalOpen(true);
            }}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Size help
          </button>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          {sizeVariants.map((variant, index) => {
            const raw = variant.combination || "";
            // Extract numeric parts and convert to mm format
            const cleaned = raw.replace(/\(.*?\)/g, "").trim();
            const nums = cleaned.match(/\d+(?:\.\d+)?/g);
            let displaySize = cleaned;

            if (nums && nums.length >= 2) {
              // Format as "50 mm × 50 mm"
              displaySize = `${nums[0]} mm × ${nums[1]} mm`;
            }

            return (
              <label
                key={variant.id || index}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="radio"
                  name="size"
                  checked={selectedSize?.id === variant.id}
                  onChange={() => {
                    setIsCustomSize(false);
                    setCustomWidth("");
                    setCustomHeight("");
                    onSizeChange(variant);
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <span className="ml-3 text-sm text-gray-900">
                  {displaySize || raw}
                </span>
              </label>
            );
          })}
          <label className="flex items-start cursor-pointer group">
            <input
              type="radio"
              name="size"
              checked={isCustomSize}
              onChange={() => {
                setIsCustomSize(true);
                // expose a custom size object to parent so pricing tiers remain available
                const tiers =
                  (sizeVariants &&
                    sizeVariants[0] &&
                    sizeVariants[0].pricingTiers) ||
                  [];
                onSizeChange({
                  id: "custom",
                  combination: "Custom size",
                  pricingTiers: tiers,
                });
              }}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer mt-1"
            />
            <div className="ml-3 text-sm text-gray-900 flex-1">
              <div>Custom size</div>
              {isCustomSize && (
                <div className="mt-2 bg-blue-50 border border-blue-100 rounded p-3 flex items-center gap-3">
                  <input
                    type="number"
                    inputMode="numeric"
                    min="1"
                    value={customWidth}
                    onChange={(e) => {
                      const v = e.target.value;
                      setCustomWidth(v);
                      // notify parent with updated combination
                      const combo = `${v || ""} mm × ${customHeight || ""} mm`;
                      const tiers =
                        (sizeVariants &&
                          sizeVariants[0] &&
                          sizeVariants[0].pricingTiers) ||
                        [];
                      onSizeChange({
                        id: "custom",
                        combination: combo,
                        pricingTiers: tiers,
                      });
                    }}
                    placeholder="Width"
                    className="w-20 px-2 py-1 border rounded text-sm"
                  />
                  <span className="text-sm text-gray-700">×</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min="1"
                    value={customHeight}
                    onChange={(e) => {
                      const v = e.target.value;
                      setCustomHeight(v);
                      const combo = `${customWidth || ""} mm × ${v || ""} mm`;
                      const tiers =
                        (sizeVariants &&
                          sizeVariants[0] &&
                          sizeVariants[0].pricingTiers) ||
                        [];
                      onSizeChange({
                        id: "custom",
                        combination: combo,
                        pricingTiers: tiers,
                      });
                    }}
                    placeholder="Height"
                    className="w-20 px-2 py-1 border rounded text-sm"
                  />
                </div>
              )}
            </div>
          </label>
        </div>
      </div>

      {/* Quantity Selection Section */}
      {selectedSize && selectedSize.pricingTiers && (
        <div className="border-t border-gray-200 pt-8">
          <h4 className="text-lg font-bold text-gray-900 mb-4">
            Select a quantity
          </h4>
          <div className="space-y-3">
            {selectedSize.pricingTiers.map((tier, index) => {
              const totalPrice = (tier.finalPrice * tier.quantity).toFixed(2);
              const hasDiscount = tier.discount > 0;

              return (
                <label
                  key={index}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="quantity"
                      checked={
                        selectedTier?.quantity === tier.quantity &&
                        !isCustomQuantity
                      }
                      onChange={() => {
                        setIsCustomQuantity(false);
                        setCustomQuantity("");
                        setCustomQuantityError("");
                        onTierChange(tier);
                      }}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="ml-3 text-sm text-gray-900 font-medium">
                      {tier.quantity.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-900">
                      {currency}
                      {totalPrice}
                    </span>
                    {hasDiscount && (
                      <span className="text-xs text-green-600 font-medium">
                        Save {tier.discount}%
                      </span>
                    )}
                  </div>
                </label>
              );
            })}
            <div>
              <label className="flex items-center cursor-pointer group mb-4">
                <input
                  type="radio"
                  name="quantity"
                  checked={isCustomQuantity}
                  onChange={() => {
                    setIsCustomQuantity(true);
                    setCustomQuantityError("");
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <span className="ml-3 text-sm text-gray-900 font-medium">
                  Custom quantity
                </span>
              </label>

              {isCustomQuantity && (
                <div className="ml-7 bg-blue-50 border border-blue-100 rounded p-4 mb-3">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={
                      selectedSize.pricingTiers[
                        selectedSize.pricingTiers.length - 1
                      ]?.quantity + 1
                    }
                    value={customQuantity}
                    onChange={(e) => {
                      const value = e.target.value;
                      setCustomQuantity(value);

                      if (value) {
                        const lastTier =
                          selectedSize.pricingTiers[
                            selectedSize.pricingTiers.length - 1
                          ];
                        const numValue = parseInt(value, 10);

                        if (numValue <= lastTier.quantity) {
                          setCustomQuantityError(
                            `Quantity must be greater than ${lastTier.quantity}`
                          );
                        } else {
                          setCustomQuantityError("");
                          // Create custom tier with +1 discount
                          const customTier = {
                            quantity: numValue,
                            finalPrice: lastTier.finalPrice,
                            basePrice: lastTier.basePrice,
                            discount: lastTier.discount + 1,
                          };
                          onTierChange(customTier);
                        }
                      }
                    }}
                    placeholder={`Enter quantity (> ${
                      selectedSize.pricingTiers[
                        selectedSize.pricingTiers.length - 1
                      ]?.quantity
                    })`}
                    className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {customQuantityError && (
                    <p className="text-red-600 text-xs mt-2">
                      {customQuantityError}
                    </p>
                  )}
                </div>
              )}

              {isCustomQuantity &&
                customQuantity &&
                !customQuantityError &&
                selectedTier && (
                  <div className="flex items-center justify-between cursor-pointer ml-7 px-3 py-2 bg-gray-50 rounded border border-gray-200">
                    <span className="text-sm text-gray-900 font-medium">
                      {parseInt(customQuantity, 10).toLocaleString()}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-gray-900">
                        {currency}
                        {(
                          selectedTier.finalPrice * parseInt(customQuantity, 10)
                        ).toFixed(2)}
                      </span>
                      <span className="text-xs text-green-600 font-medium">
                        Save {selectedTier.discount}%
                      </span>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}

      {/* Price Summary and Continue Button */}
      {selectedSize && selectedTier && (
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="mb-4">
            <div className="text-3xl font-bold text-gray-900">
              {currency}
              {isCustomQuantity && customQuantity
                ? (
                    selectedTier.finalPrice * parseInt(customQuantity, 10)
                  ).toFixed(2)
                : (selectedTier.finalPrice * selectedTier.quantity).toFixed(2)}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {currency}
              {selectedTier.finalPrice.toFixed(2)} / sticker
            </div>
            {selectedTier.discount > 0 && (
              <div className="text-xs text-green-600 font-medium mt-2">
                Save {selectedTier.discount}%
              </div>
            )}
          </div>
          {/* Orange Continue button removed per request; use existing yellow Continue elsewhere on the page */}
        </div>
      )}

      {/* Size Help Modal */}
      <SizeHelpModal
        isOpen={isSizeHelpModalOpen}
        onClose={() => setIsSizeHelpModalOpen(false)}
      />
    </div>
  );
};

export default SizeVariantSelector;
