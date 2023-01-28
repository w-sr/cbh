const { deterministicPartitionKey } = require("./dpk");

const stringInput = "string";
const stringOutput =
  "f782b910cdf388931df9f00826559deee4b9348dc447cc20b585651b1f5a02203836101a349a150642cb3f9d91ea5c40bf9ab2442caf269db552daa251107562";
const inputHasLessLengthPartitionKeyString = {
  partitionKey: "partitionKey",
};
const inputHasGreaterLengthPartitionKeyString = {
  partitionKey:
    "f782b910cdf388931df9f00826559deee4b9348dc447cc20b585651b1f5a02203836101a349a150642cb3f9d91ea5c40bf9ab2442caf269db552daa251107562f782b910cdf388931df9f00826559deee4b9348dc447cc20b585651b1f5a02203836101a349a150642cb3f9d91ea5c40bf9ab2442caf269db552daa2511075621",
};
const outputHasGreaterLengthPartitionKeyString =
  "888e393e1cd9192a17454e61f43db13af6f2e52f9d3eb321e21822fe3890ffc49d0d81752552f7b81b53c52b1b697b926bd18181c9dfd8bd39f9a4d143373f5c";
const inputHasLessLengthPartitionKeyObject = {
  partitionKey: { key: "partitionKey" },
};
const inputHasGreaterLengthPartitionKeyObject = {
  partitionKey: {
    key: "f782b910cdf388931df9f00826559deee4b9348dc447cc20b585651b1f5a02203836101a349a150642cb3f9d91ea5c40bf9ab2442caf269db552daa251107562",
    value:
      "f782b910cdf388931df9f00826559deee4b9348dc447cc20b585651b1f5a02203836101a349a150642cb3f9d91ea5c40bf9ab2442caf269db552daa251107562",
  },
};
const outputHasGreaterLengthPartitionKeyObject =
  "d760cbecdf6369184e00a3d846faa73e3e96bc4bc64292c1a2166e0b9b7c328a36b621889c5b5f0c93f63bdade7661927b1f223cb433fcb7c0af039e6e9c65b6";

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns hashed string of input value when given input is string", () => {
    const trivialKey = deterministicPartitionKey(stringInput);
    expect(trivialKey).toBe(stringOutput);
  });

  describe("partitionKey exists in given input for deterministicPartitionKey function", () => {
    it("Returns partitionKey when partitionKey is string and its length is less than 256", () => {
      const trivialKey = deterministicPartitionKey(
        inputHasLessLengthPartitionKeyString
      );
      expect(trivialKey).toBe(
        inputHasLessLengthPartitionKeyString.partitionKey
      );
    });

    it("Returns partitionKey when partitionKey is string and its length is greater than 256", () => {
      const trivialKey = deterministicPartitionKey(
        inputHasGreaterLengthPartitionKeyString
      );
      expect(trivialKey).toBe(outputHasGreaterLengthPartitionKeyString);
    });

    it("Returns stringified partitionKey when partitionKey is object and its stringified length is less than 256", () => {
      const trivialKey = deterministicPartitionKey(
        inputHasLessLengthPartitionKeyObject
      );
      expect(trivialKey).toBe(
        JSON.stringify(inputHasLessLengthPartitionKeyObject.partitionKey)
      );
    });

    it("Returns stringified partitionKey when partitionKey is object and its stringified length is less than 256", () => {
      const trivialKey = deterministicPartitionKey(
        inputHasGreaterLengthPartitionKeyObject
      );
      expect(trivialKey).toBe(outputHasGreaterLengthPartitionKeyObject);
    });
  });
});
