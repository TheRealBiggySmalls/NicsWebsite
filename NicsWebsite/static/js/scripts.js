function toggleAnomalies() {
    var additionalImages = document.getElementById("hiddenAnomalies");

    // Toggle the visibility of additional images
    if (hiddenAnomalies.style.display === "none") {
        hiddenAnomalies.style.display = "block";
    } else {
        hiddenAnomalies.style.display = "none";
    }
}