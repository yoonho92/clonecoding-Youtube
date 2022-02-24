import axios from "axios";

class YoutubeAxios {
  constructor(key) {
    this.client = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3",
      params: { key: key },
    });
  }

  async mostPopular() {
    const response = await this.client.get("videos", {
      params: {
        part: "snippet",
        chart: "mostPopular",
        maxResults: 25,
      },
    });

    return response.data;
  }

  async search(query) {
    const response = await this.client.get("search", {
      params: {
        part: "snippet",
        maxResults: 25,
        q: query,
        type: "video",
      },
    });

    return response.data.items.map((item) => ({
      ...item,
      id: item.id.videoId,
    }));
    // const response = await fetch(
    //   `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=${this.key}`,
    //   this.getRequestOptions
    // );
    // const result_1 = await response.json();
    // return result_1.items.map((item) => ({ ...item, id: item.id.videoId }));
  }
}

export default YoutubeAxios;
