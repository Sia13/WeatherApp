// WeatherController.java
@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    private static final String API_KEY = "1d3427fb34a2572ef1c2301ab68db7c2";
    private static final String API_URL = "http://api.openweathermap.org/data/2.5/weather";

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping
    public ResponseEntity<String> getWeather(@RequestParam String city) {
        try {
            String url = API_URL + "?q=" + city + "&appid=" + API_KEY;
            String weatherData = restTemplate.getForObject(url, String.class);
            return ResponseEntity.ok(weatherData);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching weather data");
        }
    }
}
