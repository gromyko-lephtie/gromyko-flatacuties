document.addEventListener("DOMContentLoaded", () => {
    const participantList = document.querySelector(".participants");
    const participantDetails = document.querySelector(".participants-details");

    let participantData;

    fetch("http://localhost:3000/characters")
        .then(response => response.json())
        .then(participants => {
            participantData = participants;
            participants.forEach(participant => {
                const participantItem = createParticipantListItem(participant);
                participantList.appendChild(participantItem);
            });
        });

    function createParticipantListItem(participant) {
        const participantNameItem = document.createElement("li");
        participantNameItem.textContent = participant.name;
        participantNameItem.addEventListener("click", () => showParticipantDetails(participant));
        return participantNameItem;
    }

    function showParticipantDetails(participant) {
        const detailsContainer = createParticipantDetailsContainer(participant);
        participantDetails.innerHTML = "";
        participantDetails.appendChild(detailsContainer);

        const voteButton = detailsContainer.querySelector(".vote-button");
        if (voteButton) {
            voteButton.addEventListener("click", () => addVote(participant.id));
        }
    }

    function createParticipantDetailsContainer(participant) {
        const detailsContainer = document.createElement("div");
        detailsContainer.innerHTML = `<img src="${participant.image}" alt="${participant.name}">
                                    <p>Name: ${participant.name}</p>
                                    <p>Votes: <span id="votes-count-${participant.id}">${participant.votes}</span></p>
                                    <button class="vote-button" data-participant-id="${participant.id}">Vote for ${participant.name}</button>`;
        return detailsContainer;
    }

    function addVote(participantId) {
        const selectedParticipant = participantData.find(participant => participant.id === participantId);
        if (selectedParticipant) {
            selectedParticipant.votes++;

            const votesElement = document.getElementById(`votes-count-${participantId}`);
            if (votesElement) {
                votesElement.textContent = selectedParticipant.votes;
            }
        }
    }
});
