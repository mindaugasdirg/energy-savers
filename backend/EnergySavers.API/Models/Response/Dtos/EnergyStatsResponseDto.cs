using EnergySavers.API.Models.Response.Models;

namespace EnergySavers.API.Models.Response.Dtos
{
    public record EnergyStatsResponseDto(List<EnergyValueResponse> categories);
}