import { Company } from './company.model.js';

export const createCompany = async (companyData, userId) => {
  const { name, email, phone } = companyData;
  if (!name || !email || !phone) {
    throw new Error('Please provide company name, email, and phone number');
  }

  const existingCompany = await Company.findOne({ email });
  if (existingCompany) {
    throw new Error('Company with this email already exists');
  }

  const company = await Company.create({
    ...companyData,
    owner: userId,
  });

  return company;
};

export const getAllCompanies = async () => {
  const companies = await Company.find()
    .populate('owner', 'name email')
    .sort({ createdAt: -1 });
  return companies;
};

export const getCompanyById = async (id) => {
  const company = await Company.findById(id).populate('owner', 'name email phone');
  if (!company) {
    throw new Error('Company not found');
  }
  return company;
};

export const getMyCompanies = async (userId) => {
  const companies = await Company.find({ owner: userId }).sort({ createdAt: -1 });
  return companies;
};

export const updateCompany = async (id, companyData, userId) => {
  const company = await Company.findById(id);
  if (!company) {
    throw new Error('Company not found');
  }

  if (company.owner.toString() !== userId.toString()) {
    throw new Error('Not authorized to update this company');
  }

  const updatedCompany = await Company.findByIdAndUpdate(id, companyData, {
    new: true,
    runValidators: true,
  });

  return updatedCompany;
};
