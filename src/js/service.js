export const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Fetch failed");
    }
  } catch (error) {
    console.error(`Error getting data: ${error}`);
  }
};

export const postData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Fetch failed");
    }
  } catch (error) {
    console.error(`Error posting data: ${error}`);
  }
};

export const deleteData = async (url) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Fetch failed");
    }
  } catch (error) {
    console.error(`Error deleting data: ${error}`);
  }
};
