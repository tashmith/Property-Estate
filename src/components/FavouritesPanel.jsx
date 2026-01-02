import { X, Trash2, Heart } from "lucide-react";
import { getPropertyImage } from "@/types/property";
import { Button } from "@/components/ui/button";

const FavouritesPanel = ({
  favourites,
  onRemove,
  onClear,
  onDrop,
  onDragOver,
  onDragLeave,
  isDragOver,
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleDragStart = (e, propertyId) => {
    e.dataTransfer.setData("removeFromFavourites", propertyId);
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={`rounded-xl bg-card shadow-lg p-4 transition-all ${
        isDragOver ? "ring-2 ring-accent ring-offset-2" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-accent fill-accent" />
          <h3 className="font-display text-lg font-semibold text-foreground">
            Favourites ({favourites.length})
          </h3>
        </div>
        {favourites.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Favourites List */}
      {favourites.length === 0 ? (
        <div className="py-8 text-center">
          <Heart className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
          <p className="font-body text-sm text-muted-foreground">
            No favourites yet
          </p>
          <p className="font-body text-xs text-muted-foreground mt-1">
            Click the heart icon or drag properties here
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {favourites.map((property) => (
            <div
              key={property.id}
              draggable
              onDragStart={(e) => handleDragStart(e, property.id)}
              className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-grab active:cursor-grabbing"
            >
              {/* Thumbnail */}
              <div className="h-16 w-20 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                <img
                  src={getPropertyImage(property.images[0])}
                  alt={property.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-display text-sm font-semibold text-foreground truncate">
                  {property.title}
                </p>
                <p className="font-display text-base font-bold text-accent">
                  {formatPrice(property.price)}
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => onRemove(property.id)}
                className="flex-shrink-0 p-1.5 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                aria-label="Remove from favourites"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Drag hint */}
      {isDragOver && (
        <div className="mt-4 p-3 border-2 border-dashed border-accent rounded-lg bg-accent/5 text-center">
          <p className="font-body text-sm text-accent font-medium">
            Drop to add to favourites
          </p>
        </div>
      )}
    </div>
  );
};

export default FavouritesPanel;
