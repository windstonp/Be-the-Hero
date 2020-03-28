const GenerateUniqueID = require("../../src/utils/GenerateUniqueID");

describe('GenerateUniqueID',()=>{
  it('should generate an unique ID',()=>{
    const id = GenerateUniqueID();
    expect(id).toHaveLength(8);
  });
})