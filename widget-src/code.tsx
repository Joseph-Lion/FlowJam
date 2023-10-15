const { widget } = figma;
const { useSyncedState, usePropertyMenu, AutoLayout, Text, Input, Ellipse } =
  widget;

const colourGrey = "#B3B3B3";
const colourDarkGrey = "#757575";
const colourBorderGrey = "#cccccc";

function PropertyMenuWidget() {
  const [color, setColor] = useSyncedState("theme", "#FB6543");
  const [type, settype] = useSyncedState("type", "event");
  const [eventType, setEventType] = useSyncedState("eventType", "layout-1");

  const typeOptions = [
    { option: "event", label: "Event" },
    { option: "process", label: "Process" },
    { option: "action", label: "Action" },
    { option: "decision", label: "Decision" },
    { option: "input", label: "Input" },
    { option: "output", label: "Output" },
    { option: "manual", label: "Manual" },
    { option: "error", label: "Error" },
  ];
  const eventTypeOptions = [
    { option: "layout-1", label: "Full Step" },
    { option: "layout-2", label: "Half Step" },
    { option: "layout-3", label: "Short Step" },
    { option: "layout-4", label: "Gate" },
    { option: "layout-5", label: " Entry / Exit" },
    { option: "layout-6", label: " Context" },
    { option: "layout-7", label: " Custom" },
  ];

  const [owner, setOwner] = useSyncedState("owner", "");
  const [eventId, setEventId] = useSyncedState("eventId", "");
  const [title, setTitle] = useSyncedState("title", "");
  const [description, setDescription] = useSyncedState("description", "");
  const [gate, setGate] = useSyncedState("gate", "");
  const [startEnd, setStartEnd] = useSyncedState("startEnd", "");
  const [context, setContext] = useSyncedState("context", "");
  const [custom, setCustom] = useSyncedState("custom", "");

  let edgeRadius = 0;

  if (eventType === "layout-5") {
    edgeRadius = 200;
  } else {
    edgeRadius = 8;
  }

  usePropertyMenu(
    [
      {
        itemType: "color-selector",
        propertyName: "colors",
        tooltip: "Color selector",
        selectedOption: color,
        options: [
          { option: "#E6E6E6", tooltip: "Grey" },
          { option: "#757575", tooltip: "Slate" },
          { option: "#B4E761", tooltip: "Lime" },
          { option: "#90B94E", tooltip: "Leaf" },
          { option: "#FFCD29", tooltip: "Yolk" },
          { option: "#FFA629", tooltip: "Marmalade" },
          { option: "#FB6543", tooltip: "Tomato" },
          { option: "#0D99FF", tooltip: "Sky" },
          { option: "#EEB992", tooltip: "Peach" },
          { option: "#73BFBB", tooltip: "Ocean" },
          { option: "#FF63A5", tooltip: "Fuchsia" },
          { option: "#9747FF", tooltip: "Cadburys" },
          { option: "#ffffff", tooltip: "Snow" },
        ],
      },
      {
        itemType: "separator",
      },

      {
        itemType: "dropdown",
        propertyName: "eventTypes",
        tooltip: "eventType selector",
        selectedOption: eventType,
        options: eventTypeOptions,
      },
      {
        itemType: "separator",
      },
      {
        itemType: "dropdown",
        propertyName: "types",
        tooltip: "type selector",
        selectedOption: type,
        options: typeOptions,
      },
      {
        itemType: "separator",
      },
      {
        itemType: "link",
        propertyName: "credits",
        tooltip: `Forty Eight Point One`,
        href: "https://fortyeight.one",
        icon: `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 7H16C18.7614 7 21 9.23858 21 12C21 14.7614 18.7614 17 16 17H14M10 7H8C5.23858 7 3 9.23858 3 12C3 14.7614 5.23858 17 8 17H10M8 12H16" stroke="#ffffff" opacity="0.6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`,
      },
      {
        itemType: "separator",
      },
      {
        itemType: "link",
        propertyName: "credits",
        tooltip: `Joseph Lion`,
        href: "https://github.com/Joseph-Lion",
        icon: `<svg width="17px" height="17px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.9992 5.95846C21.0087 6.565 20.9333 7.32649 20.8658 7.8807C20.8395 8.09686 20.8037 8.27676 20.7653 8.42453C21.6227 10.01 22 11.9174 22 14C22 16.4684 20.8127 18.501 18.9638 19.8871C17.1319 21.2605 14.6606 22 12 22C9.33939 22 6.86809 21.2605 5.0362 19.8871C3.18727 18.501 2 16.4684 2 14C2 11.9174 2.37732 10.01 3.23472 8.42452C3.19631 8.27676 3.16055 8.09685 3.13422 7.8807C3.06673 7.32649 2.99133 6.565 3.00081 5.95846C3.01149 5.27506 3.10082 4.5917 3.19988 3.91379C3.24569 3.60028 3.31843 3.30547 3.65883 3.11917C4.00655 2.92886 4.37274 2.99981 4.73398 3.1021C5.95247 3.44713 7.09487 3.93108 8.16803 4.51287C9.2995 4.17287 10.5783 4 12 4C13.4217 4 14.7005 4.17287 15.832 4.51287C16.9051 3.93108 18.0475 3.44713 19.266 3.1021C19.6273 2.99981 19.9935 2.92886 20.3412 3.11917C20.6816 3.30547 20.7543 3.60028 20.8001 3.91379C20.8992 4.5917 20.9885 5.27506 20.9992 5.95846ZM20 14C20 12.3128 19.6122 10 17.5 10C16.5478 10 15.6474 10.2502 14.7474 10.5004C13.8482 10.7502 12.9495 11 12 11C11.0505 11 10.1518 10.7502 9.25263 10.5004C8.35261 10.2502 7.45216 10 6.5 10C4.39379 10 4 12.3197 4 14C4 15.7636 4.82745 17.231 6.23588 18.2869C7.66135 19.3556 9.69005 20 12 20C14.3099 20 16.3386 19.3555 17.7641 18.2869C19.1726 17.231 20 15.7636 20 14ZM10 14.5C10 15.8807 9.32843 17 8.5 17C7.67157 17 7 15.8807 7 14.5C7 13.1193 7.67157 12 8.5 12C9.32843 12 10 13.1193 10 14.5ZM15.5 17C16.3284 17 17 15.8807 17 14.5C17 13.1193 16.3284 12 15.5 12C14.6716 12 14 13.1193 14 14.5C14 15.8807 14.6716 17 15.5 17Z" fill="#ffffff" opacity="0.6"></path> </g></svg>`,
      },
    ],
    ({ propertyName, propertyValue }) => {
      if (propertyName === "colors") {
        setColor(propertyValue);
      } else if (propertyName === "types") {
        settype(propertyValue);
      } else if (propertyName === "eventTypes") {
        setEventType(propertyValue);
      } else if (propertyName === "action") {
        console.log(propertyName);
      }
    }
  );

  return (
    <AutoLayout // Wrapper
      stroke={colourBorderGrey}
      strokeWidth={4}
      cornerRadius={edgeRadius}
      strokeAlign="center"
      fill="#ccc"
      verticalAlignItems="center"
      direction="vertical"
      spacing={0}
    >
      {eventType === "layout-1" && (
        <>
          <AutoLayout
            direction="horizontal" // Row 1
          >
            <AutoLayout // Event Type Selector
              width={560}
              stroke={colourBorderGrey}
              strokeWidth={4}
              strokeAlign="center"
              cornerRadius={8}
              fill="#fff"
              height={60}
              verticalAlignItems="center"
            >
              <Text
                fontSize={21}
                width={80}
                horizontalAlignText={"center"}
                fill={color}
              >
                {"  ●"}
              </Text>

              <Text fontSize={24} horizontalAlignText={"left"} fill={color}>
                {typeOptions.find((f) => f.option === type).label}
              </Text>
            </AutoLayout>

            <Input // Event Owner
              value={owner}
              placeholder="Owner"
              horizontalAlignText="center"
              onTextEditEnd={(e) => {
                const sanitizedValue = e.characters.slice(0, 10);
                setOwner(sanitizedValue);
              }}
              fontSize={24}
              fill={colourGrey}
              width={200}
              inputFrameProps={{
                fill: "#fff",
                stroke: "#ccc",
                strokeWidth: 4,
                strokeAlign: "center",
                cornerRadius: 8,
                padding: 15,
                minHeight: 60,
                maxHeight: 60,
              }}
              inputBehavior="wrap"
            />

            <Input // Event Id
              value={eventId}
              placeholder="000"
              horizontalAlignText="center"
              onTextEditEnd={(e) => {
                const sanitizedValue = e.characters
                  .replace(/\D/g, "")
                  .slice(0, 3);
                setEventId(sanitizedValue);
              }}
              fontSize={24}
              fill="#B3B3B3"
              width={100}
              inputFrameProps={{
                fill: "#fff",
                stroke: "#ccc",
                strokeWidth: 4,
                cornerRadius: 8,
                padding: 15,
                minHeight: 60,
                maxHeight: 60,
                strokeAlign: "center",
              }}
              inputBehavior="wrap"
            />
          </AutoLayout>

          <Input // Title
            value={title}
            placeholder="Step Title"
            onTextEditEnd={(e) => {
              setTitle(e.characters);
            }}
            fontSize={40}
            letterSpacing={-0.4}
            lineHeight={54}
            fill={colourDarkGrey}
            width={860}
            inputFrameProps={{
              fill: "#fff",
              stroke: "#ccc",
              strokeWidth: 4,
              cornerRadius: 8,
              padding: 36,
              strokeAlign: "center",
              verticalAlignItems: "center",
            }}
            inputBehavior="wrap"
          />

          <Input // Description
            value={description}
            placeholder="Step Description"
            onTextEditEnd={(e) => {
              setDescription(e.characters);
            }}
            fontSize={24}
            letterSpacing={-0.4}
            lineHeight={35}
            fill={colourGrey}
            width={860}
            padding={35}
            inputFrameProps={{
              fill: "#fff",
              stroke: "#ccc",
              strokeWidth: 4,
              cornerRadius: 8,
              padding: 35,
              minHeight: 240,
              strokeAlign: "center",
            }}
            inputBehavior="wrap"
          />
        </>
      )}

      {eventType === "layout-2" && (
        <>
          <AutoLayout
            direction="horizontal" // Row 1
          >
            <AutoLayout // Event Type Selector
              width={560}
              stroke={colourBorderGrey}
              strokeWidth={4}
              strokeAlign="center"
              cornerRadius={8}
              fill="#fff"
              height={60}
              verticalAlignItems="center"
            >
              <Text
                fontSize={21}
                width={80}
                horizontalAlignText={"center"}
                fill={color}
              >
                {"  ●"}
              </Text>

              <Text fontSize={24} horizontalAlignText={"left"} fill={color}>
                {typeOptions.find((f) => f.option === type).label}
              </Text>
            </AutoLayout>

            <Input // Event Owner
              value={owner}
              placeholder="Owner"
              horizontalAlignText="center"
              onTextEditEnd={(e) => {
                const sanitizedValue = e.characters.slice(0, 10);
                setOwner(sanitizedValue);
              }}
              fontSize={24}
              fill={colourGrey}
              width={200}
              inputFrameProps={{
                fill: "#fff",
                stroke: "#ccc",
                strokeWidth: 4,
                strokeAlign: "center",
                cornerRadius: 8,
                padding: 15,
                minHeight: 60,
                maxHeight: 60,
              }}
              inputBehavior="wrap"
            />

            <Input // Event Id
              value={eventId}
              placeholder="000"
              horizontalAlignText="center"
              onTextEditEnd={(e) => {
                const sanitizedValue = e.characters
                  .replace(/\D/g, "")
                  .slice(0, 3);
                setEventId(sanitizedValue);
              }}
              fontSize={24}
              fill="#B3B3B3"
              width={100}
              inputFrameProps={{
                fill: "#fff",
                stroke: "#ccc",
                strokeWidth: 4,
                cornerRadius: 8,
                padding: 15,
                minHeight: 60,
                maxHeight: 60,
                strokeAlign: "center",
              }}
              inputBehavior="wrap"
            />
          </AutoLayout>

          <Input // Title
            value={title}
            placeholder="Step Title"
            onTextEditEnd={(e) => {
              setTitle(e.characters);
            }}
            fontSize={40}
            letterSpacing={-0.4}
            lineHeight={54}
            fill={colourDarkGrey}
            width={860}
            inputFrameProps={{
              fill: "#fff",
              stroke: "#ccc",
              strokeWidth: 4,
              cornerRadius: 8,
              padding: 36,
              strokeAlign: "center",
              verticalAlignItems: "center",
            }}
            inputBehavior="wrap"
          />
        </>
      )}

      {eventType === "layout-3" && (
        <>
          <AutoLayout
            direction="horizontal" // Row 1
          >
            <AutoLayout // Event Type Selector
              width={260}
              stroke={colourBorderGrey}
              strokeWidth={4}
              strokeAlign="center"
              cornerRadius={8}
              fill="#fff"
              height={60}
              verticalAlignItems="center"
            >
              <Text
                fontSize={21}
                width={80}
                horizontalAlignText={"center"}
                fill={color}
              >
                {"  ●"}
              </Text>

              <Text fontSize={24} horizontalAlignText={"left"} fill={color}>
                {typeOptions.find((f) => f.option === type).label}
              </Text>
            </AutoLayout>

            <Input // Event Owner
              value={owner}
              placeholder="Owner"
              horizontalAlignText="center"
              onTextEditEnd={(e) => {
                const sanitizedValue = e.characters.slice(0, 10);
                setOwner(sanitizedValue);
              }}
              fontSize={24}
              fill={colourGrey}
              width={200}
              inputFrameProps={{
                fill: "#fff",
                stroke: "#ccc",
                strokeWidth: 4,
                strokeAlign: "center",
                cornerRadius: 8,
                padding: 15,
                minHeight: 60,
                maxHeight: 60,
              }}
              inputBehavior="wrap"
            />

            <Input // Event Id
              value={eventId}
              placeholder="000"
              horizontalAlignText="center"
              onTextEditEnd={(e) => {
                const sanitizedValue = e.characters
                  .replace(/\D/g, "")
                  .slice(0, 3);
                setEventId(sanitizedValue);
              }}
              fontSize={24}
              fill="#B3B3B3"
              width={100}
              inputFrameProps={{
                fill: "#fff",
                stroke: "#ccc",
                strokeWidth: 4,
                cornerRadius: 8,
                padding: 15,
                minHeight: 60,
                maxHeight: 60,
                strokeAlign: "center",
              }}
              inputBehavior="wrap"
            />
          </AutoLayout>

          <Input // Title
            value={title}
            placeholder="Step Title"
            onTextEditEnd={(e) => {
              setTitle(e.characters);
            }}
            fontSize={40}
            letterSpacing={-0.4}
            lineHeight={54}
            fill={colourDarkGrey}
            width={560}
            inputFrameProps={{
              fill: "#fff",
              stroke: "#ccc",
              strokeWidth: 4,
              cornerRadius: 8,
              padding: 36,
              strokeAlign: "center",
              verticalAlignItems: "center",
            }}
            inputBehavior="wrap"
          />
        </>
      )}

      {eventType === "layout-4" && (
        <>
          <AutoLayout
            direction="horizontal" // Row 1
          >
            <AutoLayout // Event Type Selector
              width={100}
              stroke={colourBorderGrey}
              strokeWidth={4}
              strokeAlign="center"
              cornerRadius={8}
              fill="#fff"
              height={60}
              verticalAlignItems="center"
            >
              <Text
                fontSize={26}
                width={88}
                horizontalAlignText={"center"}
                fill={color}
              >
                {"  ◆"}
              </Text>
            </AutoLayout>

            <Input // Event Id
              value={eventId}
              placeholder="000"
              horizontalAlignText="center"
              onTextEditEnd={(e) => {
                const sanitizedValue = e.characters
                  .replace(/\D/g, "")
                  .slice(0, 3);
                setEventId(sanitizedValue);
              }}
              fontSize={24}
              fill="#B3B3B3"
              width={100}
              inputFrameProps={{
                fill: "#fff",
                stroke: "#ccc",
                strokeWidth: 4,
                cornerRadius: 8,
                padding: 15,
                minHeight: 60,
                maxHeight: 60,
                strokeAlign: "center",
              }}
              inputBehavior="wrap"
            />
          </AutoLayout>

          <Input // Gate
            value={gate}
            placeholder="Gate"
            horizontalAlignText="center"
            onTextEditEnd={(e) => {
              setGate(e.characters);
            }}
            fontSize={40}
            letterSpacing={-0.4}
            lineHeight={54}
            fill={colourDarkGrey}
            width={200}
            inputFrameProps={{
              fill: "#fff",
              stroke: "#ccc",
              strokeWidth: 4,
              cornerRadius: 8,
              padding: 36,
              strokeAlign: "center",
              verticalAlignItems: "center",
            }}
            inputBehavior="wrap"
          />
        </>
      )}

      {eventType === "layout-5" && (
        <>
          <Input // Entry Exit
            value={startEnd}
            horizontalAlignText="center"
            verticalAlignText="center"
            onTextEditEnd={(e) => {
              const sanitizedValue = e.characters.slice(0, 10);
              setStartEnd(sanitizedValue);
            }}
            fontSize={40}
            letterSpacing={-0.4}
            lineHeight={54}
            fill={colourDarkGrey}
            width={220}
            height={220}
            inputFrameProps={{
              fill: color,
              strokeWidth: 4,
              strokeAlign: "center",
            }}
            inputBehavior="wrap"
          />
        </>
      )}

      {eventType === "layout-6" && (
        <>
          <AutoLayout
            direction="horizontal" // Row 1
          >
            <Input // Context
              value={context}
              placeholder="Context"
              horizontalAlignText="center"
              onTextEditEnd={(e) => {
                setContext(e.characters);
              }}
              fontSize={24}
              fill={colourGrey}
              width={560}
              inputFrameProps={{
                fill: "#fff",
                stroke: "#ccc",
                strokeWidth: 4,
                strokeAlign: "center",
                cornerRadius: 8,
                padding: 15,
                minHeight: 60,
              }}
              inputBehavior="wrap"
            />
          </AutoLayout>
        </>
      )}

      {eventType === "layout-7" && (
        <>
          <AutoLayout
            direction="horizontal" // Row 1
          >
            <AutoLayout // Event Type Selector
              width={560}
              stroke={colourBorderGrey}
              strokeWidth={4}
              strokeAlign="center"
              cornerRadius={8}
              fill="#fff"
              height={60}
              verticalAlignItems="center"
            >
              <Text
                fontSize={21}
                width={80}
                horizontalAlignText={"center"}
                fill={color}
              >
                {"  ●"}
              </Text>

              <Input // Event Owner
                value={custom}
                placeholder="Type"
                onTextEditEnd={(e) => {
                  const sanitizedValue = e.characters.slice(0, 20);
                  setCustom(sanitizedValue);
                }}
                fontSize={24}
                fill={color}
                width={400}
                inputFrameProps={{}}
                inputBehavior="wrap"
              />
            </AutoLayout>

            <Input // Event Owner
              value={owner}
              placeholder="Owner"
              horizontalAlignText="center"
              onTextEditEnd={(e) => {
                const sanitizedValue = e.characters.slice(0, 10);
                setOwner(sanitizedValue);
              }}
              fontSize={24}
              fill={colourGrey}
              width={200}
              inputFrameProps={{
                fill: "#fff",
                stroke: "#ccc",
                strokeWidth: 4,
                strokeAlign: "center",
                cornerRadius: 8,
                padding: 15,
                minHeight: 60,
                maxHeight: 60,
              }}
              inputBehavior="wrap"
            />

            <Input // Event Id
              value={eventId}
              placeholder="000"
              horizontalAlignText="center"
              onTextEditEnd={(e) => {
                const sanitizedValue = e.characters
                  .replace(/\D/g, "")
                  .slice(0, 3);
                setEventId(sanitizedValue);
              }}
              fontSize={24}
              fill="#B3B3B3"
              width={100}
              inputFrameProps={{
                fill: "#fff",
                stroke: "#ccc",
                strokeWidth: 4,
                cornerRadius: 8,
                padding: 15,
                minHeight: 60,
                maxHeight: 60,
                strokeAlign: "center",
              }}
              inputBehavior="wrap"
            />
          </AutoLayout>

          <Input // Title
            value={title}
            placeholder="Step Title"
            onTextEditEnd={(e) => {
              setTitle(e.characters);
            }}
            fontSize={40}
            letterSpacing={-0.4}
            lineHeight={54}
            fill={colourDarkGrey}
            width={860}
            inputFrameProps={{
              fill: "#fff",
              stroke: "#ccc",
              strokeWidth: 4,
              cornerRadius: 8,
              padding: 36,
              strokeAlign: "center",
              verticalAlignItems: "center",
            }}
            inputBehavior="wrap"
          />

          <Input // Description
            value={description}
            placeholder="Step Description"
            onTextEditEnd={(e) => {
              setDescription(e.characters);
            }}
            fontSize={24}
            letterSpacing={-0.4}
            lineHeight={35}
            fill={colourGrey}
            width={860}
            inputFrameProps={{
              fill: "#fff",
              stroke: "#ccc",
              strokeWidth: 4,
              cornerRadius: 8,
              padding: 35,
              minHeight: 240,
              strokeAlign: "center",
            }}
            inputBehavior="wrap"
          />
        </>
      )}
    </AutoLayout>
  );
}

widget.register(PropertyMenuWidget);
